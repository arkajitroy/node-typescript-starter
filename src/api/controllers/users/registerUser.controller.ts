import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../../../model/users/Users.model";
import { utility } from "../../../utils";
import { services } from "../../../api/services";
import { StatusCodes } from "http-status-codes";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, profileImage, email } = req.body;

    // Check the existing user
    const existUsername = await services.users.duplicateUsernameCheck(username);
    if (existUsername) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: "Username Exists! Please try again",
      });
    }

    // Check for existing email
    const existEmail = await services.users.duplicateEmailCheck(email);
    if (existEmail) {
      res.status(StatusCodes.BAD_REQUEST).send({
        message: "Email Exists! Please try again",
      });
    }

    if (password) {
      const hashedPassword = await utility.auth.hashedPasswordCoverter(password);

      const newUserPayload = {
        username,
        password: hashedPassword,
        profileImage: profileImage || "",
        email,
      };

      const userInstance = new UserModel(newUserPayload);

      try {
        const result = await userInstance.save();

        res.status(StatusCodes.CREATED).send({
          message: "User registered successfully",
          result: result,
        });
      } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
      }
    }
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error });
  }
};
