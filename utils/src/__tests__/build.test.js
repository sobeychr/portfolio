import { tsAliasToVite } from '../build';

describe('src/build.mjs', () => {
  describe('tsAliasToVite()', () => {
    let res;

    it('should return an empty object if not defined', () => {
      res = tsAliasToVite();
      expect(res).toMatchObject({});

      res = tsAliasToVite({});
      expect(res).toMatchObject({});

      res = tsAliasToVite({
        compilerOptions: {
          paths: {},
        },
      });
      expect(res).toMatchObject({});
    });

    it('should return the first entry', () => {
      res = tsAliasToVite({
        compilerOptions: {
          paths: {
            '@mock': [
              'src/mock/*',
            ],
          },
        },
      });
      expect(res).toMatchObject({
        '@mock': 'src/mock/',
      });
    });

    it('should replace relative path', () => {
      res = tsAliasToVite({
        compilerOptions: {
          paths: {
            '@mock': [
              'src/mock/*',
            ],
          },
        },
      }, '/path-to-my-project/src/');
      expect(res).toMatchObject({
        '@mock': '/path-to-my-project/src/mock/',
      });
    });
  });
});
