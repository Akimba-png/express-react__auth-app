import jwt from 'jsonwebtoken';

class TokenService {
  constructor() {
    this.accessKey = process.env.JWT_ACCESS_KEY;
    this.refreshKey = process.env.JWT_REFRESH_KEY;
  }
  generateToken(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {expiresIn: '20m'});
    const refreshToken = jwt.sign(payload, this.refreshKey, {expiresIn: '20m'});
    return { accessToken, refreshToken };
  }
  checkToken(token) {
    try {
      const user = jwt.verify(token, process.env.JWT_ACCESS_KEY);
      return user;
    } catch (error) {
      return null;
    }
  }
  checkRefreshToken(token) {
    try {
      const user = jwt.verify(token, process.env.JWT_REFRESH_KEY);
      return user;
    } catch (error) {
      return null;
    }
  }
}

export const tokenService = new TokenService();
