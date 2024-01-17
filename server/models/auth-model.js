import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { dbService } from '../services/db-service.js';

class AuthModel {
  static dbPath = resolve('db', 'auth-db.json'); 
  
  static async findOne(data) {
    const users = await dbService.read(this.dbPath);
    return users.find((user) => {
      return Object.values(user).includes(data);
    });
  }

  static async create(data) {
    const id = randomUUID();
    data.id = id;
    const users = await dbService.read(this.dbPath);
    users.push(data);
    await dbService.write(this.dbPath, users);
    return data;
  }
}

export { AuthModel };