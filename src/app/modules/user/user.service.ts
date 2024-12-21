import AppError from '../errors/AppError';
import { UserModel } from './user.model';
import httpStatus from 'http-status';   

const blockUser = async (userId: string) => {
  const user = await UserModel.findById(userId);
  // check if the user is not found
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  // check if the user is already blocked
  if (user.isBlocked) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User is already blocked');
  }
  const result = await UserModel.findByIdAndUpdate(userId, { isBlocked: true });
  return result;
};

export const UserService = {
  blockUser,
};
