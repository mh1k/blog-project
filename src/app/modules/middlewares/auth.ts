/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { UserModel } from '../user/user.model';
import { TUserRole } from '../user/user.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    // checking is token empty
    if (!bearerToken) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized');
    }
    const token = bearerToken.split(' ')?.[1];
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    const { role, email } = decoded;

    const user = await UserModel.isUserExistsByEmail(email);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not found');
    }
    const userStatus = user.isBlocked;
    if (userStatus) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user has been blocked');
    }
    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized');
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
