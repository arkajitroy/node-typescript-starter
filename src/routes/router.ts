import { Router } from "express";
import userRoutes from "./users/users.routes";
import authRoutes from "./auth/auth.routes";
const router = Router();

const AppRouter = (): Router => {
  userRoutes(router, "users");
  authRoutes(router, "auth");

  // return
  return router;
};

export default AppRouter;
