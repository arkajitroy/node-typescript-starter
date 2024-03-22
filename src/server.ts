import express from "express";
import cors from "cors";
import compression from "compression";
import bodyParser from "body-parser";
import { LOCAL_SERVER_PORT } from "./config/config";
import dotenv from "dotenv";
import dbConnect from "./config/db.config";
import { Route } from "./routes";

// Constants
const app = express();
dotenv.config();

// middlewares
app.use(cors({ credentials: true }));
app.use(compression());
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Routing Configuration
app.use("/api", Route);

// Server and Database Connection
dbConnect()
  .then(() => {
    app.listen(LOCAL_SERVER_PORT, () => {
      console.log("The Backend Server is running @PORT", LOCAL_SERVER_PORT);
    });
  })
  .catch((error: Error) => {
    console.error("Failed to connect to the database:", error.message);
  });
