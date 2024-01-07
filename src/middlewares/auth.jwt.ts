import jwt from "jsonwebtoken";
import express from "express";
import { JWT_SECRET_KEY } from "../config/config";
import { StatusCodes } from "http-status-codes";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
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
