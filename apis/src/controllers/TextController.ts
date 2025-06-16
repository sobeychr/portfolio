import { CRedis } from '@classes/CRedis';
import { DelayController } from '@controllers/DelayController';
import { cacheToResponse, quickJson, responseToCache } from '@utils/api';
import { DEFAULT } from '@utils/lorem';
import { getRandomInt } from '@utils/number';
import { getId, getText, getTitle } from '@utils/string';

export class TextController {
  private static _expire = 3600; // 1 hour
  private static _cache = new CRedis('text', { expire: TextController._expire });

  static async cacheGetAll() {
    return await TextController._cache.getDetails();
  }

  static async delete(field: string) {
    return await TextController._cache.delete(field);
  }

  static async deleteAll() {
    return await TextController._cache.deleteAll();
  }

  static async getRandomTexts({ url }) {
    const prevCache = await TextController._cache.get('randomText');
    if (prevCache) {
      const prevResponse = cacheToResponse(prevCache);
      return prevResponse;
    }

    await DelayController.applyDelay((url as URL).searchParams);

    const texts = [];
    for (let i = 0; i < getRandomInt(1, 10); i++) {
      texts.push({
        id: getId(),
        order: i,
        text: getText(DEFAULT),
        title: getTitle(DEFAULT),
      });
    }

    const response = quickJson(texts);
    const cache = await responseToCache(response);
    await TextController._cache.set('randomText', cache);

    return response;
  };
}
