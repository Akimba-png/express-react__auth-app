import { authService } from './../services/auth-service.js';

class AuthController {
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await authService.create(name, email, password);
      res.status(201).send(user);
    } catch (error) {
      res.status(500).end(error.message);
    }
  }
}

export const authController = new AuthController();