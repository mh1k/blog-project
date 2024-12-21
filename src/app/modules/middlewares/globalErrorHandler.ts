/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
import { ZodError } from 'zod';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';
import AppError from '../errors/AppError';
import { TErrorSource } from '../../config/error';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';

  let errorSource: TErrorSource = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  //handle zod error, validation error, cast error and duplicate error
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  } else if (error.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  } else if (error?.name === 'CastError') {
    const simplifiedError = handleCastError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  } else if (error?.code === 11000) {
    const simplifiedError = handleDuplicateError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSource = simplifiedError.errorSources;
  }else if(error?.name === 'TokenExpiredError'){
    statusCode = 401;
    message = 'Token Session Expired';
  }
   else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorSource = [
      {
        path: '',
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    message = error.message;
    errorSource = [
      {
        path: '',
        message: error?.message,
      },
    ];
  }

  // response the error
  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    // errorSource, 
    error,
    stack: config.node_env === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
