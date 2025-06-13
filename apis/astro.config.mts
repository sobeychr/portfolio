import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import node from '@astrojs/node';
import packageJson from './package.json';
import { resolve } from 'path';
import solidJs from '@astrojs/solid-js';

const envConfigs = loadEnv('', process.cwd(), '');
const SRC_DIR = resolve(process.cwd(), './src/') + '/';

const {
  SERVER_HOST = 'localhost.local',
  SERVER_PORT = '3000',
} = envConfigs;

const { version = '0.0.1' } = packageJson;

console.log('> Running Test-APIs');

export default defineConfig({
  adapter: node({
    mode: 'standalone',
  }),
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  integrations: [
    solidJs(),
  ],
  output: 'server',
  server: {
    host: SERVER_HOST,
    port: parseInt(SERVER_PORT, 10),
  },
  trailingSlash: 'never',
  vite: {
    define: {
      'import.meta.env.VERSION': JSON.stringify(version),
    },
    // SCSS aliases
    resolve: {
      alias: {
        '@styles/': `${SRC_DIR}styles/`,
      },
    },
  },
});
