import { Request, Response, NextFunction } from 'express';
import CustomError from '../utils/customError';

const errorHandler = (error: any, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof CustomError) {
    res.status(error.statusCode).json({ message: error.message });
  } else {
    res.status(500).json({ message: error.message });
  }
};

export default errorHandler;