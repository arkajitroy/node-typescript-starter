import express, { Request, Response } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { LOCAL_SERVER_PORT } from "./config/config";
import { StatusCodes } from "http-status-codes";
import AppRouter from "./routes/router";
import dbConnect from "./config/db.config";

// constants
const app = express();

// configuring the middlewares
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.disable("x-powered-by");

app.get("/", (req: Request, res: Response) => {
  res
    .status(StatusCodes.CREATED)
    .json("Server is Running :" + LOCAL_SERVER_PORT);
});

// router configuration
app.use("/api/", AppRouter());

// server and database connections
const server = http.createServer(app);

dbConnect()
  .then(() => {
    server.listen(LOCAL_SERVER_PORT, () => {
      console.log("Server running on port: " + LOCAL_SERVER_PORT);
    });
  })
  .catch((error: Error) => {
    console.error("Failed to connect to the database:", error.message);
    process.exit(1);
  });
