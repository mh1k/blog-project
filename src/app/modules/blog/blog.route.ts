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

export const BlogRoutes = router;
