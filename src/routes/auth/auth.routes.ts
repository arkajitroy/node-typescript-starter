import express, { Request, Response } from 'express';
import { apiController } from '../../api/controllers';

export const AuthRoutes = express.Router();

// Auth Routes

AuthRoutes.post('/register', apiController.auth.register);

AuthRoutes.post('/login', (req: Request, res: Response) => {
  try {
    console.log('It is in the login API');
    return res.status(200).send({
      message: 'Successfully Logged in',
    });
  } catch (error) {
    return res.status(500).send({
      message: 'Unsuccssfully logged in',
    });
  }
});
