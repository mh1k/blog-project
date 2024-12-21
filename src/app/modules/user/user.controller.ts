import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';
import httpStatus from 'http-status';

const blockUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;
  await UserService.blockUser(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User blocked successfully',
    data: '',
  });
});

export const UserController = {
  blockUser,
};
