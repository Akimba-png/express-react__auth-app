import { authService } from '../services/auth-service.js';
import { tokenService } from '../services/token-service.js';

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

  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
      res.status(204).send('user successfully logged out');
    } catch (error) {
      next(error);
    }
  }

  async refresh(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const data = await authService.refresh(refreshToken);
      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        maxAge: 72000,
      });
      res.status(200).send(data.user);
    } catch (error) {
      next(error);
    }
  }
}

export const authController = new AuthController();
