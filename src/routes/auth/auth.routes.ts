import { Router } from "express";
import { apiController } from "../../api/controllers";

const authRoutes = (router: Router, subRoute: string) => {
  router.post(`/${subRoute}/register`, apiController.auth.registerUser);
};

export default authRoutes;
