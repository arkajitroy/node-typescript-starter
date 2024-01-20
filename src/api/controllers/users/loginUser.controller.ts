import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { services } from "../../../api/services";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../../config/config";

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const userInstance = await services.users.getUserInstanceByUsername(username, res);

    // check wheather the password is empty or not
    if (!password || password.length === 0) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Password is invalid or password is empty",
      });
    }

    // Creating JWT Token
    const jwtUserPayload = {
      userId: userInstance._id,
      username: userInstance.username,
    };
    const token = jwt.sign(jwtUserPayload, JWT_SECRET_KEY, { expiresIn: "24h" });

    return res.status(StatusCodes.OK).send({
      message: "Successfully Logged in",
      username: userInstance.username,
      token,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: "Cannot Find user Data",
    });
  }
};
