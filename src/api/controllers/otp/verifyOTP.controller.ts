import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { OTP_CODE } = req.query;
    let { OTP, resetSession } = req.app.locals;

    if (parseInt(OTP) === parseInt(OTP_CODE as unknown as string)) {
      OTP = null; // reset the OTP
      resetSession = true;

      return res.status(StatusCodes.OK).send({
        message: "Verify Successfully",
      });
    }
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: "Invalid OTP",
    });
  }
};
