import { Router } from "express";
import userRoutes from "./users/users.routes";
const router = Router();

const AppRouter = (): Router => {
  userRoutes(router, "users");

  // return
  return router;
};

export default AppRouter;
