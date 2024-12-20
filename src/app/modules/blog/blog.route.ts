import express from 'express';
import { BlogController } from './blog.controller';
import auth from '../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import validateRequest from '../middlewares/validateRequest';
import { blogValidation } from './blog.validation';

const router = express.Router();

router.post(
  '/',
  auth(USER_ROLE.user),
  validateRequest(blogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);
router.patch(
  '/:id',
  auth(USER_ROLE.user),
  validateRequest(blogValidation.updateBlogValidationSchema),
  BlogController.updateBlog,
);

router.delete('/:id', auth(USER_ROLE.user), BlogController.deleteBlog);

router.get('/', BlogController.getBlogs);

router.delete('/blogs/:id', auth(USER_ROLE.admin), BlogController.deleteBlogByAdmin);

export const BlogRoutes = router;
