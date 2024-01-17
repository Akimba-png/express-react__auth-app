import jwt from 'jsonwebtoken';

class TokenService {
  constructor() {
    this.accessKey = process.env.JWT_ACCESS_KEY;
    this.refreshKey = process.env.JWT_REFRESH_KEY;
  }
  generateToken(payload) {
    const accessToken = jwt.sign(payload, this.accessKey, {expiresIn: '2m'});
    const refreshToken = jwt.sign(payload, this.refreshKey, {expiresIn: '5m'});
    return { accessToken, refreshToken };
  }
}

export const tokenService = new TokenService();
