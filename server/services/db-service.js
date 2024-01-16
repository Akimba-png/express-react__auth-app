import path from 'node:path';
import { readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

class DbService {
  constructor(dbFile) {
    this.path = path.resolve('db', dbFile);
  }

  async find() {
    return await this.#readDb();
  }

  async findOne(item) {
    const data = await this.#readDb();
    return data.find((elem) => {
      return Object.values(elem).some(value => value === item);
    });
  }

  async insertOne(item) {
    const id  = randomUUID();
    item.id = id;
    const data = await this.#readDb();
    data.push(item);
    await this.#writeDb(JSON.stringify(data));
    return item;
  }

  async #readDb() {
    try {
      const data = await readFile(this.path, {encoding: 'utf-8'});
      return JSON.parse(data);
    } catch (error) {
      throw new Error('file system error', error);
    }
  }

  async #writeDb(data) {
    try {
      await writeFile(this.path, data);
      return data;
    } catch (error) {
      throw new Error('file system error', error);
    }
  }
}

export { DbService };