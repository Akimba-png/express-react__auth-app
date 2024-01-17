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
}

export { TokenModel };
