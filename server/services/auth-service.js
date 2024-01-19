import bcrypt from 'bcrypt';
import { UserModel } from './../models/user-model.js';
import { UserDto } from './../dtos/user-dto.js';
import { tokenService } from './../services/token-service.js';
import { TokenModel } from './../models/token-model.js';
import { CustomError } from './../error/custom-error.js';

const SALT = 7;

class AuthService {
  async signup(name, email, password) {
    let candidate = await UserModel.findOne(email);
    if (candidate) {
      throw CustomError.BadRequest('user is already exist');
    }
    const hashedPassword = await bcrypt.hash(password, SALT);
    candidate = { name, email, password: hashedPassword };
    const user = await UserModel.create(candidate);
    const userDto = new UserDto(user);
    const token = tokenService.generateToken({ ...userDto });
    userDto.accessToken = token.accessToken;
    await TokenModel.create(token.refreshToken, userDto.id);
    return {
      user: userDto,
      refreshToken: token.refreshToken,
    }
  }

  async login(email, password) {
    const user = await UserModel.findOne(email);
    if (!user) {
      throw CustomError.BadRequest(`email ${email} is unregistered`);
    }
    const isPasswordCorrect = await bcrypt.compare(
      password, user.password
    );
    if (!isPasswordCorrect) {
      throw CustomError.BadRequest('email or password is incorrect');
    }
    const userDto = new UserDto(user);
    const token = tokenService.generateToken({ ...userDto });
    userDto.accessToken = token.accessToken;
    await TokenModel.updateOne(token.refreshToken, userDto.id);
    return {
      user: userDto,
      refreshToken: token.refreshToken,
    };
  }
}

export const authService = new AuthService();
