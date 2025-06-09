import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const start = Date.now();

const PATH_ROOT = resolve(process.cwd(), '.').concat('/');
const PATH_DIST = PATH_ROOT.concat('public/widgets/');
const PATH_PUBLIC = '/widgets/';

const EXTS = /.js$/;
const filesJs = [];

const dir = readdirSync(PATH_DIST).filter(entry => EXTS.test(entry));
console.log(`${dir?.length || 0} asset files found`);

dir.forEach(filename => {
  const ext = filename.substring(filename.lastIndexOf('.'));
  if (ext.includes('.js')) filesJs.push(filename);
});

const getFileSize = (acc, filename) => {
  const path = PATH_DIST.concat(filename);

  if (existsSync(path)) {
    const data = readFileSync(path);
    return acc + data?.toString?.()?.length || 0;
  }

  return acc;
};

const sizeJs = (filesJs.reduce(getFileSize, 0) / 1024).toFixed(2);
console.log(`${filesJs?.length || 0} js files found, ${sizeJs}KB combined`);

const jsToTag = entry => ({
  attributes: {
    type: 'module',
    src: PATH_PUBLIC.concat(entry),
  },
  tag: 'script',
});

const manifest = {
  files: dir.map(entry => PATH_PUBLIC.concat(entry)),
  tags: [
    ...filesJs.map(jsToTag),
  ],
};

const pathManifest = PATH_DIST.concat('manifest.json');
const dataManifest = JSON.stringify(manifest);
const sizeManifest = (dataManifest?.length || 0) / 1024;

console.log(`writting manifest ${sizeManifest.toFixed(2)}KB`);
console.log(`writting manifest "${pathManifest.replace(PATH_ROOT, '')}"`);

writeFileSync(pathManifest, dataManifest);

const end = Date.now();

console.log(`process done in ${end - start}ms`);
