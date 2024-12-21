import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogService } from './blog.service';


const createBlog = catchAsync(async (req, res) => {
  const result = await BlogService.createBlogIntoDB(req.body, req.user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog is created successfully',
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const user = req.user;
  const blogId = req.params.id;
  const result = await BlogService.updateBlogIntoDB(req.body, blogId, user);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Blog updated successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const user = req.user;
  const blogId = req.params.id;
  await BlogService.deleteBlogFromDB(blogId, user);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
    data: '',
  });
});

const getBlogs = catchAsync(async (req, res) => {
  const result = await BlogService.getBlogsFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blogs fetched successfully',
    data: result,
  });
});

const deleteBlogByAdmin = catchAsync(async (req, res) => {
    const blogId = req.params.id;
    await BlogService.deleteBlogByAdminFromDB(blogId);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blog deleted successfully',
        data: '',
    });
})

export const BlogController = {
  getBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  deleteBlogByAdmin,
};
