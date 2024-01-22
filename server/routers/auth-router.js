import { Router } from 'express';
import { authController } from './../controllers/auth-controller.js';

const authRouter = Router();

authRouter.post('/signup', authController.signup);
authRouter.post('/login', authController.login);
authRouter.delete('/logout', authController.logout);
authRouter.get('/refresh', authController.refresh);

export { authRouter };
