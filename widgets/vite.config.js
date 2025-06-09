import solid from 'vite-plugin-solid';
import { defineConfig } from 'vite';

const configs = defineConfig(({ mode }) => {
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
      outDir: 'public/widgets/',
      rollupOptions: {
        input: {
          solidjs: 'src/components/widgets/solidjs/mount.jsx',
        },
        output: {
          entryFileNames: '[name].[hash].js',
        },
      },
    },
    clearScreen: false,
    devSourcemap: false,
    mode,
    plugins: [
      solid(),
    ],
    publicDir: false,
    sourcemap: false,
  };
});

export default configs;
