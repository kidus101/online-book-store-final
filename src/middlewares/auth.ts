import CustomError from "../utils/customError";
import {NextFunction, Request, Response} from "express";
import catchAsyncError from "../utils/catchAsyncError";
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const auth = catchAsyncError(async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new CustomError("Not authenticated", 401);
  }
  jwt.verify(token, process.env.JWT_SECRET as string, (err: any, decoded: any) => {
    if (err && err.name === "TokenExpiredError") {
      throw new CustomError("Token expired", 401);
    }
    if (err && err.name === "JsonWebTokenError") {
      throw new CustomError("Invalid token", 401);
    }
    req.user = decoded;
     
  });
  next();
})
  
