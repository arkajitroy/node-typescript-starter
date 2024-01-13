import { getUser } from "./users/getUser.controller";
import { registerUser } from "./users/registerUser.controller";

export const apiController = {
  auth: {
    registerUser: registerUser,
  },
  user: {
    getUser: getUser,
  },
};
