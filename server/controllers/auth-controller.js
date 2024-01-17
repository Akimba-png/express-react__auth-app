import { authService } from '../services/auth-service.js';

class AuthController {
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const data = await authService.signup(name, email, password);
      res.status(201).json(data.user);
    } catch (error) {
      res.status(400).send(`error happend, ${error.message}`);
    }
  }
}

export const authController = new AuthController();
