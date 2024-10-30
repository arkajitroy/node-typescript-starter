import express from 'express';
import compression from 'compression';
import dotenv from 'dotenv';
import { corsMiddleware } from '../config/cors.config';
import cookieParser from 'cookie-parser';

// constants
const app = express();
dotenv.config();

// middlewares-configuration
app.use(corsMiddleware);
app.use(express.json());
app.use(compression());
app.use(express.json({ limit: '200kb', type: 'application/json' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());

// Routing Configuration

export const AppServer = app;
