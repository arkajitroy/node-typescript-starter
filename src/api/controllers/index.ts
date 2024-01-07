import { getUser } from "./users/getUser.controller";

export const apiController = {
  user: { getUser: getUser },
};
