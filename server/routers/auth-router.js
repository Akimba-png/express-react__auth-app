import { Router } from 'express';
import { authController } from './../controllers/auth-controller.js';

const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);

export { authRouter };
