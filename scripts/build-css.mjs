// Ship the stylesheet + fonts verbatim. No preprocessor: the CSS is authored
// as plain CSS with custom properties, so `dist` is a straight copy.
import { cp, mkdir, readdir, readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src', 'styles');
const dist = join(root, 'dist');

await mkdir(join(dist, 'fonts'), { recursive: true });

for (const file of ['dhaakon-ui.css', 'fonts.css', 'site.css', 'theme.css']) {
  await cp(join(src, file), join(dist, file));
}

const fonts = await readdir(join(src, 'fonts'));
for (const f of fonts.filter((n) => n.endsWith('.woff2'))) {
  await cp(join(src, 'fonts', f), join(dist, 'fonts', f));
}

// Guard: every `@import` target in the entry stylesheet must exist in dist.
const entry = await readFile(join(dist, 'dhaakon-ui.css'), 'utf8');
for (const m of entry.matchAll(/@import\s+['"]\.\/([^'"]+)['"]/g)) {
  await access(join(dist, m[1])).catch(() => {
    throw new Error(`build-css: dhaakon-ui.css imports ./${m[1]} but it is not in dist/`);
  });
}

console.log(`build-css: dist/dhaakon-ui.css (+ imports) + dist/theme.css + ${fonts.length} fonts`);
