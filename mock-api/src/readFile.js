const { existsSync, readFileSync } = require('node:fs');
const { resolve } = require('node:path');

const OPTIONS = { encoding: 'utf8' };
const ROOT = resolve(process.cwd(), 'src/data/');

const readFile = (filepath, asJson = true) => {
  const path = resolve(ROOT, filepath);
  if (!existsSync(path)) {
    return null;
  }

  const file = readFileSync(path, OPTIONS);
  return asJson ? JSON.parse(file) : file;
};

module.exports = readFile;
