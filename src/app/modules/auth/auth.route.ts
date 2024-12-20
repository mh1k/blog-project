import express from 'express';
import { AuthController } from './auth.controller';
import validateRequest from '../middlewares/validateRequest';
import { userValidation } from '../user/user.validation';
import { AuthValidation } from './auth.validation';

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

export const AuthRoutes = router;
