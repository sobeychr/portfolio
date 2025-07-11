import { CRedis } from '@classes/CRedis';
import { DelayController } from '@controllers/DelayController';
import { cacheToResponse, quickJson, responseToCache } from '@utils/api';
import { getRandomName } from '@utils/name';
import { getRandomInt } from '@utils/number';
import { getId } from '@utils/string';

export class AvatarController {
  private static _expire = 1800; // 30 mins
  private static _cache = new CRedis('avatar', { expire: AvatarController._expire });

  static async cacheGetAll() {
    return await AvatarController._cache.getDetails();
  }

  static async delete(field: string) {
    return await AvatarController._cache.delete(field);
  }

  static async deleteAll() {
    return await AvatarController._cache.deleteAll();
  }

  static async getRandomAvatars({ url }) {
    const prevCache = await AvatarController._cache.get('randomAvatar');
    if (prevCache) {
      const prevResponse = cacheToResponse(prevCache);
      return prevResponse;
    }

    await DelayController.applyDelay((url as URL).searchParams);

    const avatars = [];
    for (let i = 0; i < getRandomInt(10, 50); i++) {
      const name = getRandomName();
      avatars.push({
        id: getId(),
        image: '$image1',
        name,
        order: i,
      });
    }

    const response = quickJson({
      avatars,
      prefix: {
        '$image1': 'https://api.dicebear.com/9.x/lorelei/svg?flip=false&seed=${name}&size=64',
      },
    });

    const cache = await responseToCache(response);
    await AvatarController._cache.set('randomAvatar', cache);
    return response;
  };
}
