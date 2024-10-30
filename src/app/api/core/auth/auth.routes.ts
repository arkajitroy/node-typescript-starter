import { Router } from 'express';

export const AuthRouter = Router();

AuthRouter.route('/login').post();
AuthRouter.route('/register').post();
