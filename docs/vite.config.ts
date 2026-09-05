import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const here = resolve(fileURLToPath(import.meta.url), '..');
// The docs read @dhaakon/ui straight from ../src, so the site always shows the
// working tree rather than the last published tarball.
const kit = resolve(here, '..', 'src');
const kitPkg = createRequire(import.meta.url)('../package.json');

export default defineConfig({
  // Read from the kit's package.json so the version shown cannot drift.
  define: { __KIT_VERSION__: JSON.stringify(kitPkg.version) },
  plugins: [react()],
  resolve: {
    alias: [
      { find: /^@dhaakon\/ui\/styles\.css$/, replacement: resolve(kit, 'styles/dhaakon-ui.css') },
      { find: /^@dhaakon\/ui\/site$/, replacement: resolve(kit, 'site/index.ts') },
      { find: /^@dhaakon\/ui\/app$/, replacement: resolve(kit, 'app/index.ts') },
      { find: /^@dhaakon\/ui\/tokens$/, replacement: resolve(kit, 'tokens.ts') },
      { find: /^@dhaakon\/ui$/, replacement: resolve(kit, 'index.ts') },
    ],
    // The kit source sits outside this project root, so its bare imports would
    // otherwise resolve against ../node_modules — two Reacts, broken hooks.
    dedupe: ['react', 'react-dom', 'react-aria-components', 'react-aria', 'react-stately'],
  },
  server: {
    port: 5174,
    allowedHosts: true,
    // CSS aliases import sibling source assets, including the bundled Plex fonts.
    // Permit only the docs project and kit source; retain Vite's strict boundary.
    fs: { allow: [here, kit] },
  },
  build: { outDir: 'dist', emptyOutDir: true },
});
