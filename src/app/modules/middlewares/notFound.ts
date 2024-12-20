/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';

const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'API not found ',
    error: '',
  });
};

export default notFound;
