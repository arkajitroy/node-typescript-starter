import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const createResetSession = async (req: Request, res: Response) => {
  try {
    let { resetSession } = req.app.locals;
    if (resetSession)
      return res.status(StatusCodes.CREATED).send({
        flag: resetSession,
      });

    return res.status(440).send({
      message: "Session Expired",
    });
  } catch (error: any) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      error: error.message,
    });
  }
};
