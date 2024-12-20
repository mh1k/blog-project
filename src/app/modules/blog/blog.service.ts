import { JwtPayload } from 'jsonwebtoken';
import { IBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogIntoDB = async (payload: IBlog, user: JwtPayload) => {
  payload.author = user.userId;
  const result = (await BlogModel.create(payload)).populate('author');
  return result;
};

export const BlogService = {
  createBlogIntoDB,
};
