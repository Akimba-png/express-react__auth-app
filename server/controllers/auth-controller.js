import { authService } from '../services/auth-service.js';

class AuthController {
  async signup(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const user = await authService.createUser(name, email, password);
      res.status(201).send(user);
    } catch(error) {
      console.log(error.message);
      res.status(500).end(error.message);
    }
  }
}

export const authController = new AuthController();