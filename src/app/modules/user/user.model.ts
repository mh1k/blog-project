import { model, Schema } from 'mongoose';
import { IUser, IUserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<IUser, IUserModel>(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
        },
        password: {
            type: String,
            trim: true,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters long'],
            select: 0,
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        },
        isBlocked: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    },
);

// hash password before saving
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// remove password from the response
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  next();
});

// check user is exists by email
userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password');
};

export const UserModel = model<IUser, IUserModel>('User', userSchema);
