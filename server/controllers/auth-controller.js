import { authService } from '../services/auth-service.js';

class AuthController {
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const data = await authService.signup(name, email, password);
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        maxAge: 72000,
      });
      res.status(201).json(data.user);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const data = await authService.login(email, password);
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        maxAge: 72000,
      });
      res.status(200).json(data.user);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
