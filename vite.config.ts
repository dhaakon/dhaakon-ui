import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// Minimal config consumed by Storybook's Vite builder.
// The library build uses vite.lib.config.ts instead (`npm run build`).
export default defineConfig({
  resolve: {
    alias: { '@': resolve(__dirname, 'src') },
  },
});
