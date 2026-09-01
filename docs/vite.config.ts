import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const here = resolve(fileURLToPath(import.meta.url), '..');
// The docs read @dhaakon/ui straight from ../src, so the site always shows the
// working tree rather than the last published tarball.
const kit = resolve(here, '..', 'src');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@dhaakon\/ui\/styles\.css$/, replacement: resolve(kit, 'styles/dhaakon-ui.css') },
      { find: /^@dhaakon\/ui\/site$/, replacement: resolve(kit, 'site/index.ts') },
      { find: /^@dhaakon\/ui\/tokens$/, replacement: resolve(kit, 'tokens.ts') },
      { find: /^@dhaakon\/ui$/, replacement: resolve(kit, 'index.ts') },
    ],
    // The kit source sits outside this project root, so its bare imports would
    // otherwise resolve against ../node_modules — two Reacts, broken hooks.
    dedupe: ['react', 'react-dom', 'react-aria-components'],
  },
  server: { port: 5174, allowedHosts: true },
  build: { outDir: 'dist', emptyOutDir: true },
});
