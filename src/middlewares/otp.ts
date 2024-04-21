import { NextFunction, Request, Response } from 'express';

export function OTPLocal(req: Request, res: Response, next: NextFunction): void {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
