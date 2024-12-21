import { AuthService } from './auth.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const register = catchAsync(async (req, res) => {
  const result = await AuthService.register(req.body);

  const registeredData = {
    _id: result._id,
    name: result.name,
    email: result.email,
  };

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data: registeredData,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Login successful',
    data: result,
  });
});


export const AuthController = {
  register,
  login,
};
