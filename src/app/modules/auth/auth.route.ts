import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';
import { AuthValidation } from './auth.validation';
import { USER_ROLE } from '../user/user.constant';
import auth from '../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateRequest(userValidation.registerUserValidationSchema),
  AuthController.register,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.login,
);

router.patch('/users/:userId/block',auth(USER_ROLE.admin), AuthController.blockUser);
export const AuthRoutes = router;
