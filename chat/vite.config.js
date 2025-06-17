import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { getBuildDetails, getGitLogs, tsAliasToVite } from './script/build';
import packageJson from './package.json';
import tsConfigs from './tsconfig.json';

const PATH_ROOT = resolve(process.cwd(), '.').concat('/');
const PATH_SRC = PATH_ROOT.concat('src/');

const { version = '0.0.1' } = packageJson;

const configs = defineConfig(({ mode }) => {
  const envConfigs = loadEnv('', process.cwd(), '');

  const {
    SERVER_HOST = 'localhost.local',
    SERVER_PORT = '3000',
  } = envConfigs;

  const build = getBuildDetails();
  const gitLogs = getGitLogs();
  const aliases = tsAliasToVite(tsConfigs, PATH_SRC);

  const details = [
    `on ${build.osName}`,
    `v${version}`,
    `tag ${gitLogs.tag}`,
    `shortHash ${gitLogs.shortHash}`,
    `Node v${build.nodeVersion}`,
    `NPM v${build.npmVersion}`,
  ];
  console.log(`> Running Test-Chat ${details.join(', ')}`);

  return {
    appType: 'spa',
    base: '/',
    build: {
      emptyOutDir: true,
      manifest: false,
      minify: true,
      reportCompressedSize: true,
      sourcemap: false,
      ssr: false,
      target: 'esnext',
      rollupOptions: {
        input: {
          chat: 'src/react/index.jsx',
        },
        output: {
          entryFileNames: 'assets/[name].[hash].js',
          manualChunks: {
            react: [
              'react',
              'react/jsx-dev-runtime',
              'react-dom',
              'react-dom/client',
              'scheduler',
            ],
          },
        },
      },
    },
    clearScreen: false,
    define: {
      'import.meta.env.BUILD': JSON.stringify(build),
      'import.meta.env.GIT': JSON.stringify(gitLogs),
      'import.meta.env.VERSION': JSON.stringify(version),
    },
    devSourcemap: true,
    mode,
    plugins: [
      react(),
    ],
    publicDir: PATH_ROOT.concat('public/'),
    resolve: {
      alias: aliases,
    },
    outdir: 'dist/',
    server: {
      // middlewareMode: true,
      host: SERVER_HOST,
      port: parseInt(SERVER_PORT, 10),
    },
    sourcemap: true,
  };
});

export default configs;
