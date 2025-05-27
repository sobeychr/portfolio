import { spawnSync } from 'node:child_process';
import { getBuildDetails, getGitLogs, tsAliasToVite } from '../build';

jest.mock('node:child_process');

describe('src/build.js', () => {
  const preEnv = process;

  beforeAll(() => {
    process = {
      platform: 'Linux Ubuntu 24.05',
      versions: {
        node: '2.2.2',
      },
    };
  });

  afterAll(() => {
    process = preEnv;
  });

  let res;

  describe('getBuildDetails()', () => {
    beforeAll(() => {
      spawnSync.mockImplementation(() => ({
        stdout: 'npm v1.1.1',
      }));
    });

    it('should return Node and NPM versions', () => {
      res = getBuildDetails();
      expect(res).toMatchObject({
        nodeVersion: '2.2.2',
        npmVersion: '1.1.1',
        osName: expect.any(String),
      });
    });

    it('should return "osName" as "Linux"', () => {
      process.platform = 'Linux Ubuntu 24.0.5';

      res = getBuildDetails();
      expect(res).toMatchObject({
        osName: 'Linux',
      });
    });

    it('should return "osName" as "Windows"', () => {
      process.platform = 'Windows XP';

      res = getBuildDetails();
      expect(res).toMatchObject({
        osName: 'Windows',
      });
    });

    it('should return "osName" as "!invalid"', () => {
      process.platform = undefined;

      res = getBuildDetails();
      expect(res).toMatchObject({
        osName: '!invalid',
      });
    });
  });

  describe('getGitLogs()', () => {
    it('should return with invalid data', () => {
      spawnSync.mockImplementation(() => null);

      res = getGitLogs();
      expect(res).toMatchObject({
        shortHash: '!invalid',
        tag: '!invalid',
        timestamp: '!invalid',
      });
    });

    it('should return with shortHash', () => {
      spawnSync.mockImplementationOnce(() => ({
        stdout: 'custom-short-hash,'
      }));

      res = getGitLogs();
      expect(res).toMatchObject({
        shortHash: 'custom-short-hash',
      });
    });

    it('should return with tag', () => {
      spawnSync
        .mockImplementationOnce(() => null)
        .mockImplementationOnce(() => ({
          stdout: 'tag-3\ntag-2\ntag-1'
        }));

      res = getGitLogs();
      expect(res).toMatchObject({
        tag: 'tag-3',
      });
    });

    it('should return with timestamp', () => {
      spawnSync.mockImplementationOnce(() => ({
        stdout: ',12345678901 '
      }));

      res = getGitLogs();
      expect(res).toMatchObject({
        timestamp: 12345678901,
      });
    });

    it('should return with full data', () => {
      spawnSync
        .mockImplementationOnce(() => ({
          stdout: 'custom-short-hash,12345678901 '
        }))
        .mockImplementationOnce(() => ({
          stdout: 'tag-3\ntag-2\ntag-1'
        }));

      res = getGitLogs();
      expect(res).toMatchObject({
        shortHash: 'custom-short-hash',
        tag: 'tag-3',
        timestamp: 12345678901,
      });
    });
  });

  describe('tsAliasToVite()', () => {
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
