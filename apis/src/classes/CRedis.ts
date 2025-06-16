// https://www.npmjs.com/package/redis
import { createClient } from 'redis';
import type { RedisClientExtensions } from '@redis/client/dist/lib/client';

type OptionsType = {
  expire?: number;
};

export class CRedis {
  name: string;

  _client: RedisClientExtensions;
  _expire: number = 0;

  constructor(name: string, options: OptionsType = {}) {
    this.name = name;

    this._expire = options.expire || 0;

    const client = createClient();

    client.on('end', () => console.log('[CRedis] ending'));
    client.on('error', (err: Error) => console.log('[CRedis] error', err));
    client.on('connect', () => console.log('[CRedis] connected'));
    client.on('ready', () => console.log('[CRedis] ready'));
    client.on('reconnecting', () => console.log('[CRedis] reconnecting'));

    client.connect();
    this._client = client;

    Object.freeze(this);
  }

  async delete(field: string) {
    await this._client.hDel(this.name, field);
  }

  async deleteAll() {
    const all = await this.getAll();
    const keys = Object.keys(all);
    if (keys.length > 0) {
      await this.delete(keys);
    }
  }

  async get(field: string): Promise<null | string> {
    return await this._client.hGet(this.name, field);
  }

  async getAll() {
    return await this._client.hGetAll(this.name);
  }

  async getDetails() {
    const values = await this.getAll();
    /* values = { field1: "value1", field2: "value2", field3: "value3" }; */

    if (Object.keys(values).length == 0) {
      return {};
    }

    const expires = await this.getExpires(Object.keys(values));
    /* expies = [ timestampField1, timestampField2, timestampField3 ]; */

    const parsed = Object.keys(values).reduce((acc, key, index) => ({
      ...acc,
      [key]: {
        expire: expires[index],
        value: acc[key],
      },
    }), values);
    /* parsed = {
        field1: { expire: timestampField1, value: "value1" },
        field2: { expire: timestampField2, value: "value2" },
        field2: { expire: timestampField3, value: "value3" },
      }
    */

    return parsed;
  }

  async getExpires(fields: string[]): Promise<number[]> {
    return await this._client.hExpireTime(this.name, fields);
  }

  async set(field: string, value: string, expire: number = 0) {
    await this._client.hSet(this.name, field, value);

    const exp = expire || this._expire || 0;
    if (exp > 0) {
      await this._client.hExpire(this.name, field, exp, 'LT');
    }
  }
}
