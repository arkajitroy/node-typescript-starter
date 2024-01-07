export function OTPLocal(req: any, res: any, next: any): void {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
