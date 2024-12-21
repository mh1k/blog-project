class AppError extends Error {
  public statusCode: number;
  public errMessage: string;
  constructor(statusCode: number, message: string, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.errMessage = message;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
