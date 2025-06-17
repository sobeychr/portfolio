import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import packageJson from './package.json';

const PATH_ROOT = resolve(process.cwd(), '.').concat('/');
const PATH_REACT = PATH_ROOT.concat('src/react/');

const { version = '0.0.1' } = packageJson;

const configs = defineConfig(({ mode }) => {
  const envConfigs = loadEnv('', process.cwd(), '');

  const {
    SERVER_HOST = 'localhost.local',
    SERVER_PORT = '3000',
  } = envConfigs;

  console.log('> Running Test-Chat');

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
      'import.meta.env.VERSION': JSON.stringify(version),
    },
    devSourcemap: true,
    mode,
    plugins: [
      react(),
    ],
    publicDir: PATH_ROOT.concat('public/'),
    resolve: {
      alias: {
        '@core': PATH_REACT.concat('core/'),
        '@utils': PATH_REACT.concat('utils/'),
      },
    },
    outdir: 'dist/',
    server: {
      host: SERVER_HOST,
      port: parseInt(SERVER_PORT, 10),
    },
    sourcemap: true,
  };
});

export default configs;
