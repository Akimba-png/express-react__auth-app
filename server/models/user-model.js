import path from 'node:path';
import crypto from 'node:crypto';
import { dbService } from './../services/db-service.js';

class UserModel {
  static dbPath = path.resolve('db', 'user-db.json');

  static async findOne(param) {
    const users = await dbService.read(this.dbPath);
    return users.find((user) => {
      return Object.values(user).includes(param);
    });
  }

  static async create(user) {
    const id = crypto.randomUUID();
    user.id = id;
    const users = await dbService.read(this.dbPath);
    users.push(user);
    await dbService.write(this.dbPath, users);
    return user;
  }
}

export { UserModel };
