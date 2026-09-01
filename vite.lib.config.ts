import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

const pkg = createRequire(import.meta.url)('./package.json');
const EXTERNAL = [
  ...Object.keys(pkg.dependencies ?? {}),
  ...Object.keys(pkg.peerDependencies ?? {}),
  'react/jsx-runtime',
];

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
      // Everything in dependencies/peerDependencies stays external so consumers
      // dedupe one copy — bundling React Aria here would double it in any app
      // that also uses it directly.
      external: (id) => EXTERNAL.some((p) => id === p || id.startsWith(`${p}/`)),
      output: { preserveModules: false },
    },
    sourcemap: true,
    minify: false,
    emptyOutDir: true,
  },
});
