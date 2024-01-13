import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { JWT_SECRET_KEY } from "../config/config";
import { StatusCodes } from "http-status-codes";
import UserModel from "../model/users/Users.model";

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // access authorize header to validate request
    const token = req.headers.authorization.split(" ")[1];

    // retrieve the user details for the logged-in user
    const decodedToken: any = await jwt.verify(token, JWT_SECRET_KEY);

    req.user = decodedToken;

    next();

    return next();
  } catch (error: any) {
    return res.json(StatusCodes.BAD_REQUEST).send({
      message: "Invalid Token!",
      error: error,
      token: req.header("token"),
    });
  }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    const userInstance = await UserModel.findOne({ username });

    if (!userInstance) {
      return res.status(StatusCodes.NOT_FOUND).send({
        message: "User dont exist!",
      });
    }

    next();
  } catch (error: any) {
    return res.status(StatusCodes.NOT_FOUND).send({ error });
  }
};
