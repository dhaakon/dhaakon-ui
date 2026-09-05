import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const targets = { docs: join(root, 'docs/dist'), storybook: join(root, 'storybook-static') };
const destination = targets[process.argv[2]];
if (!destination) throw new Error('Expected docs or storybook target');
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
await mkdir(join(destination, 'licenses'), { recursive: true });
await cp(join(root, 'src/styles/fonts/OFL.txt'), join(destination, 'licenses/IBM-Plex-OFL.txt'));
await writeFile(join(destination, 'build-info.json'), JSON.stringify({
  name: pkg.name,
  version: pkg.version,
  revision: process.env.UI_BUILD_REVISION ?? 'working-tree',
  fontNotice: 'licenses/IBM-Plex-OFL.txt',
}, null, 2) + '\n');
console.log('Build identity and IBM Plex notice written to ' + process.argv[2] + '.');
