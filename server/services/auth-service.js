import { DbService } from './db-service.js';
import { UserDto } from './../dtos/user-dto.js';
import bcrypt from 'bcrypt';


const SALT = 7;

class AuthService {
  constructor() {
    this.db = new DbService('auth-db.json');
  }

  async createUser(name, email, password) {
    const dbUser = await this.db.findOne(email);
    if (dbUser) {
      throw new Error('user is already exist');
    }
    const hashedPassword = await bcrypt.hash(password, SALT);
    const candidate = {
      name,
      email,
      password: hashedPassword,
    };
    const createdUser = await this.db.insertOne(candidate);
    return new UserDto(createdUser);
  }
}

export const authService = new AuthService();