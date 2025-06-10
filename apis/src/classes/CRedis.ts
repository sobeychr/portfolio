// https://www.npmjs.com/package/redis
import type { RedisClientExtensions } from '@redis/client/dist/lib/client';
import { createClient } from 'redis';

export class CRedis {
  static MAX_LOGS = 45;

  _client: RedisClientExtensions | undefined;

  async create(): Promise<boolean> {
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

    console.log('[CRedis.create()] created instance');
    return true;
  }

  async delete(key: string): Promise<boolean> {
    if (!this._client) {
      console.log(`[CRedis.delete()] cannot delete "${key}" before instance creation`);
      return false;
    }

    await this._client.DEL(key);
    return true;
  }

  async get(key: string): Promise<null | string> {
    if (!this._client) {
      console.log(`[CRedis.get()] cannot get "${key}" before instance creation`);
      return null;
    }

    const value = await this._client?.get(key);
    const valueCut = value?.substring?.(0, Math.min(CRedis.MAX_LOGS, value.length));
    console.log(`[CRedis.get()] searched "${key}", found [${typeof value}]`, valueCut || value);
    return value;
  }

  isCreated(): boolean {
    return !!this._client;
  }

  async set(key: string, value: string): Promise<boolean> {
    if (!this._client) {
      console.log(`[CRedis.set()] cannot set "${key}" before instance creation`);
      return false;
    }

    const valueCut = value?.substring?.(0, Math.min(CRedis.MAX_LOGS, value.length));
    console.log(`[CRedis.set()] setting "${key}", to`, valueCut || value);

    await this._client?.set(key, value);
    return true;
  }
}
