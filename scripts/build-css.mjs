// Ship the stylesheet + fonts verbatim. No preprocessor: the CSS is authored
// as plain CSS with custom properties, so `dist` is a straight copy.
import { cp, mkdir, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src', 'styles');
const dist = join(root, 'dist');

await mkdir(join(dist, 'fonts'), { recursive: true });

for (const file of ['dhaakon-ui.css', 'fonts.css', 'theme.css']) {
  await cp(join(src, file), join(dist, file));
}

const fonts = await readdir(join(src, 'fonts'));
for (const f of fonts.filter((n) => n.endsWith('.woff2'))) {
  await cp(join(src, 'fonts', f), join(dist, 'fonts', f));
}

console.log(`build-css: dist/dhaakon-ui.css + dist/theme.css + ${fonts.length} fonts`);
