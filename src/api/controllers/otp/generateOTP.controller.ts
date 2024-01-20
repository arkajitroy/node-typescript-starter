import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { utility } from "../../../utils";

export const generateOTP = async (req: Request, res: Response) => {
  try {
    let { OTP } = req.app.locals;

    const generatedOTP = utility.auth.OTPGenerator({ length: 6, alphanumeric: true });
    OTP = generateOTP;

    return res.status(StatusCodes.CREATED).send({
      message: "Successfully generated new OTP!",
      code: generatedOTP,
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      error: "Failed to generate OTP!",
    });
  }
};
