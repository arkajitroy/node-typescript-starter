import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IUser } from "dbmodels/User.interface";
import { services } from "../../../api/services";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;

    if (!username)
      return res.status(StatusCodes.NOT_FOUND).send({
        message: "Invalid Useername",
      });

    const userInstances: IUser | null = await services.users.getUserInstanceByUsername(username, res);

    return res.json(StatusCodes.OK).send({
      result: "Successfully fetched users",
      data: {
        userInstances: userInstances,
      },
    });
  } catch (error) {
    return res.json(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: "Cannot Find user Data",
    });
  }
};
