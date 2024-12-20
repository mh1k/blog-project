import { JwtPayload } from 'jsonwebtoken';
import { IBlog } from './blog.interface';
import { BlogModel } from './blog.model';
import AppError from '../errors/AppError';

const getBlogsFromDB = async (query: Record<string, unknown>) => {
  let search = ''; // set default value

  // if search is given set it
  const BlogsSearchableFields = ['title', 'content'];
  if (query?.search) {
    search = query?.search as string;
  }

  const searchQuery = BlogModel.find({
    $or: BlogsSearchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  }).populate({
    path: 'author',
    select: '-isBlocked -email -role',
  });

  // sorting
  const sortBy = ['title', 'createdAt'];
  const sortOrder = ['asc', 'desc'];
  if (query.sortBy && query.sortOrder) {
    if (!sortBy.includes(query.sortBy as string)) {
      throw new AppError(400, 'Invalid sort by, use title or createdAt');
    }
    if (!sortOrder.includes(query.sortOrder as string)) {
      throw new AppError(400, 'Invalid sort order, use asc or desc');
    }
  }
  let sort = 'createdAt';
  if (query.sortBy && query.sortOrder) {
    sort = `${query.sortOrder === 'asc' ? '' : '-'}${query.sortBy as string}`;
  }

  const sortQuery = searchQuery.sort(sort);

  // filtering author
  const filterQuery = await sortQuery.find(
    query?.filter ? { author: query.filter } : {},
  );
  return filterQuery;
};

const createBlogIntoDB = async (payload: IBlog, user: JwtPayload) => {
  payload.author = user.userId;
  const result = (await BlogModel.create(payload)).populate('author');
  return result;
};

const updateBlogIntoDB = async (
  payload: IBlog,
  blogId: string,
  user: JwtPayload,
) => {
  if (Object.keys(payload).length === 0) {
    throw new AppError(400, 'Title or content is required');
  }
  const blog = await BlogModel.findOne({ _id: blogId, author: user.userId });
  if (!blog) {
    throw new AppError(404, 'Blog not found');
  }
  const result = await BlogModel.findByIdAndUpdate(blogId, payload, {
    new: true,
  });
  return result;
};

const deleteBlogFromDB = async (blogId: string, user: JwtPayload) => {
  const blog = await BlogModel.findOne({ _id: blogId, author: user.userId });
  if (!blog) {
    throw new AppError(404, 'Blog not found');
  }
  const result = await BlogModel.findByIdAndDelete(blogId);
  return result;
};

const deleteBlogByAdminFromDB = async (blogId: string) => {
  const result = await BlogModel.findByIdAndDelete(blogId);
  if (!result) {
    throw new AppError(404, 'Blog not found');
  }
  return result;
};

export const BlogService = {
  getBlogsFromDB,
  createBlogIntoDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
  deleteBlogByAdminFromDB,
};
