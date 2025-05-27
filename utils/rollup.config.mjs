import { readdirSync } from 'node:fs';
import { extname, resolve } from 'node:path';
import terser from '@rollup/plugin-terser';

const DIR_DIST = 'dist/';
const DIR_SRC = 'src/';

const files = readdirSync(DIR_SRC).filter(filename => /\.[jt]sx?$/.test(filename));

const input = files.reduce((acc, filename) => ({
  ...acc,
  [filename.replace(extname(filename), '')]: resolve(DIR_SRC, filename),
}), {});

export default {
  input,
  output: {
    dir: DIR_DIST,
    format: 'cjs',
    plugins: [terser()],
  },
};
