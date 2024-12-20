import { z } from 'zod';

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({ required_error: 'Title is Required' })
      .min(5, { message: 'Title must be at least 5 characters' }),
    content: z
      .string({ required_error: 'Content is Required' })
      .min(10, { message: 'Content must be at least 10 characters' }),
  }),
});

export const blogValidation = { createBlogValidationSchema };
