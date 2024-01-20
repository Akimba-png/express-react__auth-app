import path from 'node:path';
import { dbService } from '../services/db-service.js';
import crypto from 'node:crypto';

class TokenModel {
  static dbPath = path.resolve('db', 'token-db.json');

  static async create(refreshToken, userId) {
    const id = crypto.randomUUID();
    const tokens = await dbService.read(this.dbPath);
    tokens.push({
      id,
      userId,
      refreshToken,
    });
    await dbService.write(this.dbPath, tokens);
  }

  static async findOne(id) {
    const tokens = await dbService.read(this.dbPath);
    return tokens.find((token) => {
      return Object.values(token).includes(id);
    });
  }

  static async updateOne(refreshToken, userId) {
    const tokens = await dbService.read(this.dbPath);
    const token = tokens.find((item) => {
      return Object.values(item).includes(userId);
    });
    token.refreshToken = refreshToken;
    const updatedTokens = tokens.map((item) => {
      if (item.userId === userId) {
        return token;
      }
      return item;
    });
    await dbService.write(this.dbPath, updatedTokens);
  }
}

export { TokenModel };
