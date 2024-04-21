import express from 'express';
import { AuthRoutes } from './auth/auth.routes';

export const Route = express.Router();

// Routes with connected subroutes
Route.use('/auth', AuthRoutes);
