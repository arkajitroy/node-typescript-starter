import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getUser = async (req: Request, res: Response) => {
  try {
    console.log("call from controller");

    return res.json(StatusCodes.OK).send({
      result: "Successfully fetched users",
    });
  } catch (error) {
    return res.json(StatusCodes.NOT_FOUND).send({
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
