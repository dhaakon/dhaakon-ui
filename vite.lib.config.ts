import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

// Library build. Storybook has its own Vite pipeline and ignores this file.
export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'], exclude: ['src/**/*.stories.*', 'src/stories/**'], rollupTypes: true }),
  ],
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        tokens: resolve(__dirname, 'src/tokens.ts'),
        site: resolve(__dirname, 'src/site/index.ts'),
      },
      formats: ['es'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react', 'clsx', 'tailwind-merge'],
      output: { preserveModules: false },
    },
    sourcemap: true,
    minify: false,
    emptyOutDir: true,
  },
});
