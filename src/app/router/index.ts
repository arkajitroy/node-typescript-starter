import express from 'express';
import { AuthRouter } from '../api/core/auth/auth.routes';

export const Route = express.Router();

// Routes with connected subroutes
Route.use('/auth', AuthRouter);
