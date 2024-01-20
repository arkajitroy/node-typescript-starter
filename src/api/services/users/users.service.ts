import { IUser } from "dbmodels/User.interface";
import UserModel from "../../../model/users/Users.model";
import { StatusCodes } from "http-status-codes";
import { Response } from "express";

export const getUserInstanceByUsername = async (username: string, res: Response): Promise<IUser> => {
  try {
    const userInstances: IUser | null = await UserModel.findOne({ username }, (error: Error, user: IUser) => {
      if (error) return res.send(StatusCodes.NOT_FOUND).send({ message: error.message });
      if (!userInstances) return res.send(StatusCodes.NOT_FOUND).send({ message: "Couldn't find the user" });
      if (user) return user;
    });

    return userInstances;
  } catch (error) {
    throw error;
  }
};
