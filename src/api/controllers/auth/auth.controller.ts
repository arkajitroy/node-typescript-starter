import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { services } from '../../services';
import { utility } from '../../../utils';
import UserModel from '../../../models/users.model';
import { TUser } from '../../../@types/models/IUsers.schema';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, profile, email } = req.body;

    // Edge Cases: Checking for existing Username and Email Id
    const existingUsername = await services.auth.duplicateUsernameCheck(username);

    if (existingUsername) {
      return res.status(StatusCodes.CONFLICT).send({
        error: 'Failed to Register! Username already exists.',
      });
    }

    const existingEmailId = await services.auth.duplicateEmailCheck(email);

    if (existingEmailId) {
      return res.status(StatusCodes.CONFLICT).send({
        error: 'Failed to Register! Email already exists.',
      });
    }

    const hashedPassword = await utility.password.generateHashedPassword(password);

    const newUserCreationPayload = {
      username,
      password: hashedPassword,
      profile: profile || '',
      email,
    };

    const newUserCreationInstance = await new UserModel(newUserCreationPayload).save();

    // Return success response
    res.status(StatusCodes.CREATED).send({
      message: 'Successfully User has been created!',
      newUserCreationInstance,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: 'Failed to Register!',
    });
  }
};

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
