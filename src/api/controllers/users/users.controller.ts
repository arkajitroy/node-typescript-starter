import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import UserModel from '../../../models/users.model';

export const getProfile = async (req: Request, res: Response) => {
  try {
    const { _id } = req.user;

    const userInstance = await UserModel.findOne({ _id }).select('-password -updatedAt -__v');

    if (!userInstance) throw new Error();

    return res.status(StatusCodes.OK).send({
      message: 'Successfully fetched data!',
      userInstance,
    });
  } catch (error) {
    return res.status(StatusCodes.NOT_FOUND).send({
      error: error,
    });
  }
};
