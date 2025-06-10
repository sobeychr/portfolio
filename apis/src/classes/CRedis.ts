// https://www.npmjs.com/package/redis
import { createClient } from 'redis';

export class CRedis {
  _client;

  async create() {
    if (!!this._client) {
      return false;
    }

    const client = await createClient();

    client.on('end', () => console.log('[CRedis] ending'));

    client.on('error', (err: Error) => console.log('[CRedis] error', err));

    client.on('connect', () => console.log('[CRedis] connected'));

    client.on('ready', () => console.log('[CRedis] ready'));

    client.on('reconnecting', () => console.log('[CRedis] reconnecting'));

    client.connect();
    this._client = client;
  }

  async get(key) {
    const value = await this._client.get(key);
    console.log(`[CRedis.getValue()] searched "${key}", found [${typeof value}]`, value);
    return value;
  }

  async set(key, value) {
    console.log(`[CRedis.setKey()] setting "${key}", to`, value);
    this._client.set(key, value);
  }
}
