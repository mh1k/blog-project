/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../../config';
// import { ZodError } from "zod";
// import { TErrorSource } from "../interface/error";
// import config from "../../config";
// import handleZodError from "../errors/handleZodError";
// import handleValidationError from "../errors/handleValidationError";
// import handleCastError from "../errors/handleCastError";
// import handleDuplicateError from "../errors/handleDuplicateError";
// import AppError from "../errors/AppError";

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // let statusCode = error.statusCode || 500;
  // let message = error.message || 'Something went wrong';

  // let errorSource: TErrorSource = [
  //   {
  //     path: '',
  //     message: 'Something went wrong',
  //   },
  // ];

  // //handle zod error

  // if (error instanceof ZodError) {
  //   const simplifiedError = handleZodError(error);
  //   statusCode = simplifiedError.statusCode;
  //   message = simplifiedError.message;
  //   errorSource = simplifiedError.errorSources;
  // } else if (error.name === 'ValidationError') {
  //   const simplifiedError = handleValidationError(error);
  //   statusCode = simplifiedError.statusCode;
  //   message = simplifiedError.message;
  //   errorSource = simplifiedError.errorSources;
  // } else if (error?.name === 'CastError') {
  //   const simplifiedError = handleCastError(error);
  //   statusCode = simplifiedError.statusCode;
  //   message = simplifiedError.message;
  //   errorSource = simplifiedError.errorSources;
  // } else if (error?.code === 11000) {
  //   const simplifiedError = handleDuplicateError(error);
  //   statusCode = simplifiedError.statusCode;
  //   message = simplifiedError.message;
  //   errorSource = simplifiedError.errorSources;
  // } else if (error instanceof AppError) {
  //   statusCode = error.statusCode;
  //   message = error.message;
  //   errorSource = [
  //     {
  //       path: '',
  //       message: error?.message,
  //     },
  //   ];
  // } else if (error instanceof Error) {
  //   message = error.message;
  //   errorSource = [
  //     {
  //       path: '',
  //       message: error?.message,
  //     },
  //   ];
  // }

  // // response the error
  // res.status(statusCode).json({
  //   success: false,
  //   message,
  //   errorSource,
  //   error,
  //   stack: config.node_env === 'development' ? error?.stack : null,
  // });
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: error.message || 'Something went wrong',
    error: error,
    stack: config.node_env === 'development' ? error?.stack : null,
  });
};

export default globalErrorHandler;
