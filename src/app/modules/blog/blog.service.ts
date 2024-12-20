import { IBlog } from './blog.interface';
import { BlogModel } from './blog.model';

const createBlogIntoDB = async (payload: IBlog) => {
//   payload.author = '';
  const result = await BlogModel.create(payload);
  return result;
};

export const BlogService = {
  createBlogIntoDB,
};
