import { NextFunction, Request, Response } from 'express';
import { utility } from '../utils';
import UserModel from '../models/users.model';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // initially checking for the headers
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next({
        error: 'The User is not Authenticated',
      });
    }

    const token = authHeader.split(' ')[1];

    const { _id, role } = await utility.jwt.verifyJwt(token);
    const user = {
      _id,
      role,
    };
    req.user = user;
    next();
  } catch (error: unknown) {
    next({
      status: 500,
      message: 'Invalid Token!',
      error: error,
      token: req.header('token'),
    });
  }
};

export const validate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await UserModel.findOne({ _id: req.user?._id });
    if (user?.role === 'admin') {
      next();
    } else {
      return next({
        message: 'Something went wrong while validating!',
        status: 401,
      });
    }
  } catch (error: unknown) {
    return next({
      status: 500,
      message: 'Something went wrong while validating!',
      error,
    });
  }
};
