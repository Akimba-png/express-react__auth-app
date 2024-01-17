import { readFile, writeFile } from 'node:fs/promises';

class DbService {
  async read(path) {
    const data = await readFile(path, {encoding: 'utf-8'});
    return JSON.parse(data);
  }

  async write(path, data) {
    await writeFile(path, JSON.stringify(data));
  }
}

export const dbService = new DbService();
