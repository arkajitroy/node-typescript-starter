import { NextFunction, Response } from 'express';
import { JWT_SECRET_KEY } from '@/config/config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { TExpressRequest } from '@/@types/others/TExpress';
import UserModel from '@/models/users.model';

export const isAuthenticated = async (req: TExpressRequest, res: Response, next: NextFunction) => {
  try {
    // access authorize header to validate request
    const token: string | undefined = req.headers.authorization?.split(' ')[1];

    if (!token) return new Error('Authorization token not found');

    // retrieve the user details for the logged-in user
    const decodedToken: string | JwtPayload = await jwt.verify(token, JWT_SECRET_KEY);

    req.user = decodedToken;

    next();

    return next();
  } catch (error: unknown) {
    return res.json(StatusCodes.BAD_REQUEST).send({
      message: 'Invalid Token!',
      error: error,
      token: req.header('token'),
    });
  }
};

export const verifyUser = async (req: TExpressRequest, res: Response, next: NextFunction) => {
  try {
    const { username } = req.method == 'GET' ? req.query : req.body;

    const userInstance = await UserModel.findOne({ username });

    if (!userInstance) {
      return res.status(StatusCodes.NOT_FOUND).send({
        message: 'User dont exist!',
      });
    }

    next();
  } catch (error: unknown) {
    return res.status(StatusCodes.NOT_FOUND).send({ error });
  }
};
