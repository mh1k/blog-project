import mongoose from 'mongoose';
import { TErrorSource, TGenericErrorResponse } from '../../config/error';


const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
  const errorSources: TErrorSource = Object.values(err.errors).map(
    (ve: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: ve?.path,
        message: ve.message,
      };
    },
  );

  const statusCode = 400;

  return {
    statusCode,
    message: 'Validation Error',
    errorSources,
  };
};

export default handleValidationError;
