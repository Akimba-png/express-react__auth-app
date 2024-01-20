import { TokenModel } from '../models/token-model.js';
import { tokenService } from '../services/token-service.js';
import { CustomError } from './../error/custom-error.js';
import { UserDto } from './../dtos/user-dto.js';

const authMiddleware = async (req, _res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return next(CustomError.Unauthorized());
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      return next(CustomError.Unauthorized());
    }
    const user = tokenService.checkToken(token);
    if (!user) {
      return next(CustomError.Unauthorized());
    }
    const dbData = await TokenModel.findOne(user.id);
    if (!dbData || !dbData.refreshToken) {
      return next(CustomError.Unauthorized());
    }
    req.userData = new UserDto(user);
    next();
  } catch (error) {
    next(CustomError.Unauthorized());
  }
};

export { authMiddleware };
