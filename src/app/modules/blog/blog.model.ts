import { model, Schema } from 'mongoose';
import { IBlog } from './blog.interface';

const blogSchema = new Schema<IBlog>(
  {
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [5, 'Title must be at least 5 characters long'],
    },
    content: {
        type: String,
        required: [true, 'Content is required'],
        minlength: [20, 'Content must be at least 20 characters long'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export const BlogModel = model<IBlog>('Blog', blogSchema);
