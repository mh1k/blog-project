import { z } from 'zod';

const registerUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'Name is Required' })
      .regex(/^[A-Za-z]+$/, {
        message: 'Name must contain only alphabetic characters',
      }),
    email: z
      .string({ required_error: 'Email is Required' })
      .email({ message: 'Please use a valid email address' }),
    password: z
      .string({ required_error: 'Password is Required' })
      .min(6, { message: 'Password must be at least 6 characters' })
      .max(15, { message: 'Password can not be more than 15 characters' })
      .regex(
        /^[A-Za-z0-9!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]+$/,
        { message: 'Password must contain only alphabetic, numeric, and special characters' }
      )
  }),
});

export const userValidation = {
  registerUserValidationSchema,
};
