import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { services } from "../../../api/services";
import UserModel from "../../../model/users/Users.model";
import { IUser } from "dbmodels/User.interface";

export const resetPassword = async (req: Request, res: Response) => {
  try {
    let { resetSession } = req.app.locals;
    const { username, password } = req.body;

    if (!resetSession) return res.status(440).send({ error: "Session Expired!" });

    // check wheather the password is empty or not
    if (!password || password.length === 0) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Password is invalid or password is empty",
      });
    }

    // check wheather the username is empty or not
    if (!username || username.length === 0) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: "Username is invalid or password is empty",
      });
    }

    const hashedPassword = await services.password.generateHashedPassword(password);
    const userInstance = await services.users.getUserInstanceByUsername(username, res);

    // updating the user
    await UserModel.findOneAndUpdate(
      { username: userInstance.username },
      { password: hashedPassword },
      (error: Error, user: IUser) => {
        if (error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ error: "Failed to update!" });
        resetSession = false;

        return res.status(StatusCodes.OK).send({
          message: "Successfully Updated the Password",
          user: user.username,
        });
      }
    );
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
    });
  }
};
