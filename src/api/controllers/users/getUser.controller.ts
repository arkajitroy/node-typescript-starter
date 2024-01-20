import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserModel from "../../../model/users/Users.model";
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

// export async function getUser(req, res) {
//   const { username } = req.params;
//   try {
//     if (!username) return res.status(501).send({ error: "Invalid Username" });
//     UserModel.findOne({ username }, function (err, user) {
//       if (err) return res.status(500).send({ err });
//       if (!user)
//         return res.status(501).send({ error: "Couldn't Find the User" });
//       /** remove password from user */
//       // mongoose return unnecessary data with object so convert it into json
//       const { password, ...rest } = Object.assign({}, user.toJSON());

//       return res.status(201).send(rest);
//     });
//   } catch (error) {
//     return res.status(404).send({ error: "Cannot Find User Data" });
//   }
// }
