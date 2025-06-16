import { AvatarController } from '@controllers/AvatarController';
import { TextController } from '@controllers/TextController';
import { quickJson } from '@utils/api';

export class CacheController {
  static DELETE_GET = 'fields';
  static DELETE_SPLIT = ',';

  static DELETE_AVATAR = 'avatar';
  static DELETE_TEXT = 'text';

  static async getAll() {
    const avatars = await AvatarController.cacheGetAll();
    const texts = await TextController.cacheGetAll();

    return quickJson({
      avatars,
      texts,
    });
  }

  static async delete({ url }) {
    const params = (url as URL).searchParams;
    const fieldsStr = params.get(CacheController.DELETE_GET) || '';
    const fieldsArr = fieldsStr.split(CacheController.DELETE_SPLIT).filter(String);
    const logs = [];

    if (fieldsArr.length === 0) {
      await AvatarController.deleteAll();
      await TextController.deleteAll();
      logs.push('deleted all');
    } else {
      if (fieldsArr.includes(CacheController.DELETE_AVATAR)) {
        await AvatarController.deleteAll();
        logs.push('deleted avatar');
      }
      if (fieldsArr.includes(CacheController.DELETE_TEXT)) {
        await TextController.deleteAll();
        logs.push('deleted text');
      }
    }

    return quickJson({
      logs,
    });
  }
}
