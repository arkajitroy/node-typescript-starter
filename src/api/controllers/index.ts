import { register, resetPassword } from './auth/auth.controller';
import { registerEmail } from './auth/mail.controller';

export const apiController = {
  auth: {
    register,
    resetPassword,
    registerEmail,
  },
};
