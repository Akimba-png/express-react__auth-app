import { hash } from 'bcrypt';
import { AuthModel } from './../models/auth-model.js';

const SALT = 7;

class AuthService {
  async create(name, email, password) {
    let candidate = await AuthModel.findOne(email);
    if (candidate) {
      throw new Error('user is already exist');
    }
    const hashedPassword = await hash(password, SALT);
    candidate = { name, email, password: hashedPassword };
    const user = await AuthModel.create(candidate);
    return user;
  }
}

export const authService = new AuthService();