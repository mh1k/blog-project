import AppError from '../errors/AppError';
import { IUser } from '../user/user.interface';
import { UserModel } from '../user/user.model';
import { ILogin } from './auth.interface';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import config from '../../config';
import jwt from 'jsonwebtoken';

const register = async (payload: IUser) => {
  payload.role = 'user';
  const result = await UserModel.create(payload);
  return result;
};

const login = async (payload: ILogin) => {
  const user = await UserModel.isUserExistsByEmail(payload.email);

  //check if the user is not found
  if (!user) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'This user is not found');
  }

  //check if the user is blocked
  const isBlocked = user.isBlocked;
  if (isBlocked) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'This user is blocked');
  }

  //check if the password is correct
  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Password is not matched');
  }

  const JwtPayload = {
    userId: user._id,
    role: user.role,
    email: user.email,
  };

  // create token and sent to the client
  const accessToken = jwt.sign(JwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expired_in as string,
  });

  return {
    token: accessToken,
  };
};

const blockUser = async (userId: string) => {
  const user = await UserModel.findById(userId);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  const result = await UserModel.findByIdAndUpdate(userId, { isBlocked: true });
  return result;
};

export const AuthService = {
  register,
  login,
  blockUser
};
