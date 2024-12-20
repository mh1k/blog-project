import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';

const createBlog = catchAsync(async (req, res) => {
  const result = await BlogService.createBlogIntoDB(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog is created successfully',
    data: result,
  });
});

export const BlogController = {
  createBlog,
};
