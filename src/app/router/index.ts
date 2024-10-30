import { Request, Response, Router } from 'express';
import { AuthRouter } from '../api/core/auth/auth.routes';

export const Route = Router();

// Routes with connected subroutes
Route.get('/', async (req: Request, res: Response) => {
  return res.status(200).json({ message: 'Server is Running!' });
});

Route.use('/auth', AuthRouter);
