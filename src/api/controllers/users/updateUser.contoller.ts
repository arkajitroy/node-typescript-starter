import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserModel from "../../../model/users/Users.model";
import { IUser } from "../../../types/dbmodels/User.interface";

export const updateUser = async (req: any, res: Response) => {
  try {
    const { userId } = req.user;
    const { body } = req.body;

    if (!userId) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        error: "Something went wrong! Can not identify userId",
      });
    }

    await UserModel.updateOne({ _id: userId }, body, (error: Error, user: IUser) => {
      if (error) return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: "Failed to update" });
      return res.status(StatusCodes.CREATED).send({ message: "Updated Successfully" });
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Something went wrong",
    });
  }
};
