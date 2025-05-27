import { spawnSync } from 'node:child_process';

export const getBuildDetails = () => {
  const npmData = spawnSync(
    'npm',
    ['-v'],
    { encoding: 'utf-8', shell: true, timeout: 2500 },
  );
  const npmVersion = (String(npmData?.stdout) || '').replace(/[^\d\.]+/g, '');

  const nodeVersion = process?.versions?.node || '!invalid';
  const plat = (process?.platform || '').toLowerCase();

  const isLinux = plat.includes('linux');
  // const isMac = false; // TODO: validate MacOS
  const isWindows = plat.includes('win');

  return {
    nodeVersion,
    npmVersion,
    osName: isLinux && 'Linux' || isWindows && 'Windows' || '!invalid',
  };
};

export const getGitLogs = () => {
  const execLog = commands => {
    const data = spawnSync(
      'git',
      commands,
      { encoding: 'utf-8', timeout: 2500 },
    );
    const str = String(data?.stdout) || '';
    return str.substring(0, str.length - 1);
  };

  const split = 'TTTT';
  const format = ['%h', '%ad'].join(split);
  const logs = execLog(['log', '--max-count=1', '--date=unix', `--pretty=${format}`]);
  const tags = execLog(['tag', '-l', '--sort=-taggerdate']);

  const tag = (tags || '').split('\n')?.[0];
  const logsArray = logs.split(split);

  return {
    shortHash: logsArray[0] || '!invalid',
    tag: tag || '!invalid',
    timestamp: parseInt(logsArray?.[1] || 0, 10) || '!invalid',
  };
};

export const tsAliasToVite = (tsJson, srcDir = 'src/') => {
  const fixPath = path => path.replace('src/', srcDir).replace(/\/\*$/, '/');
  const paths = tsJson?.compilerOptions?.paths || {};
  return Object.keys(paths).reduce((acc, alias) => ({
    ...acc,
    [alias]: fixPath(paths[alias]?.[0] || ''),
  }), {});
};
