import { register, resetPassword } from './auth/auth.controller';

export const apiController = {
  auth: {
    register,
    resetPassword,
  },
};
