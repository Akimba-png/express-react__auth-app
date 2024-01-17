import { readFile,writeFile } from 'node:fs/promises';

class DbService {
  async read(path) {
    try {
      const data = await readFile(path, {encoding: 'utf-8'});
      return JSON.parse(data);
    } catch (error) {
      throw new Error (`fs error reading, ${error,message}`);
    }
  }

  async write(path, data) {
    try {
      await writeFile(path, JSON.stringify(data));
    } catch (error) {
      throw new Error(`fs error writing ${error}`)
    }
  }
}

export const dbService = new DbService();