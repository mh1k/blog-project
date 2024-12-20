
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role?: 'admin' | 'user';
  isBlocked?: boolean;
}

export interface IUserModel extends Model<IUser> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isUserExistsByEmail(email: string): Promise<Record<string, any> | null>;
}

export type TUserRole = keyof typeof USER_ROLE