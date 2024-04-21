import express, { Request, Response } from "express";

export const AuthRoutes = express.Router();

// Auth Routes

AuthRoutes.post("/login", (req: Request, res: Response) => {
  try {
    console.log("It is in the login API");
    return res.status(200).send({
      message: "Successfully Logged in",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unsuccssfully logged in",
    });
  }
});
