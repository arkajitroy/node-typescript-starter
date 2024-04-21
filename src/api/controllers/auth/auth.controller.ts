import { TUser } from '@/@types/models/TUsers.schema';
import { services } from '@/api/services';
import UserModel from '@/models/users.model';
import { utility } from '@/utils';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FilterQuery, UpdateQuery } from 'mongoose';

export const resetPassword = async (req: Request, res: Response) => {
  try {
    let { resetSession } = req.app.locals;
    const { username, password } = req.body;

    if (!resetSession) return res.status(440).send({ error: 'Session Expired!' });

    // check wheather the password is empty or not
    if (!password || password.length === 0) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Password is invalid or password is empty',
      });
    }

    // check wheather the username is empty or not
    if (!username || username.length === 0) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Username is invalid or password is empty',
      });
    }

    const hashedPassword = await utility.password.generateHashedPassword(password);
    const userInstance = await services.users.getUserInstanceByUsername(username);

    if (!userInstance) {
      return res.status(StatusCodes.NOT_FOUND).send({
        message: 'Failed to fetch user!',
      });
    }

    const instanceFinderFilterQuery: FilterQuery<TUser> = {
      username: userInstance.username,
    };

    const passwordUpdationQueryPayload: UpdateQuery<TUser> = {
      password: hashedPassword,
    };

    // updating the user
    await UserModel.findOneAndUpdate(
      instanceFinderFilterQuery,
      passwordUpdationQueryPayload,
      (error: Error, user: TUser) => {
        if (error) {
          return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
            error: 'Failed to update!',
          });
        }
        resetSession = false;

        return res.status(StatusCodes.OK).send({
          message: 'Successfully Updated the Password',
          user: user.username,
        });
      },
    );
  } catch (error: unknown) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error,
    });
  }
};
