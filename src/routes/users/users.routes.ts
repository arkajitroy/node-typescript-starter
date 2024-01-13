import express from "express";
import { apiController } from "../../api/controllers";
import { registerUser } from "../../api/controllers/users/registerUser.controller";

const userRoutes = (router: express.Router, subRoute: string) => {
  router.get(`/${subRoute}/get-user`, apiController.user.getUser);
};

export default userRoutes;
