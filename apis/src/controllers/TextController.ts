import { CRedis } from '@classes/CRedis';
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

  static async getRandomTexts() {
    const prevCache = await TextController._cache.get('alpha');
    if (prevCache) {
      const prevResponse = cacheToResponse(prevCache);
      return prevResponse;
    }

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
    await TextController._cache.set('alpha', cache);

    return response;
  };
}
