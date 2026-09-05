import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { mkdtemp, readFile, readdir, rm, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';

const run = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temporary = await mkdtemp(join(tmpdir(), 'dhaakon-ui-package-'));
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const require = createRequire(import.meta.url);

try {
  // These versions share internal context instances. Update them together.
  assert.equal(pkg.dependencies['react-aria'], require('react-aria-components/package.json').dependencies['react-aria']);
  const { stdout } = await run('npm', ['pack', '--json', '--pack-destination', temporary], { cwd: root });
  const [packed] = JSON.parse(stdout);
  assert.equal(packed.version, pkg.version);
  assert(packed.files.length > 20, 'package should include declarations, split modules, CSS and fonts');
  for (const { path } of packed.files) {
    assert(!/(^|\/)(node_modules|src|docs|tests|storybook-static)\/|\.test\.|\.stories\.|\.npmrc$/.test(path), `unexpected package file: ${path}`);
  }
  await run('tar', ['-xzf', join(temporary, packed.filename), '-C', temporary]);
  const extracted = join(temporary, 'package');
  await symlink(join(root, 'node_modules'), join(extracted, 'node_modules'), 'dir');
  const dist = join(extracted, 'dist');
  assert((await readFile(join(dist, 'fonts/OFL.txt'), 'utf8')).includes('Copyright © 2017 IBM Corp.'));
  for (const file of (await readdir(dist)).filter((name) => name.endsWith('.css'))) {
    const css = await readFile(join(dist, file), 'utf8');
    for (const match of css.matchAll(/(?:@import\s+['"]|url\(['"]?)(\.\/[^'"\s)]+)/g)) {
      await readFile(resolve(dist, match[1]));
    }
  }
  const modules = {};
  for (const [entry, target] of Object.entries(pkg.exports)) {
    if (typeof target !== 'object') continue;
    await readFile(join(extracted, target.types));
    modules[entry] = await import(pathToFileURL(join(extracted, target.import)).href);
  }
  const core = modules['.'];
  const app = modules['./app'];
  const site = modules['./site'];
  for (const name of ['Button', 'DhaakonProvider', 'Field', 'Input', 'Select', 'MultiSelect', 'Drawer', 'Modal', 'Tabs']) assert(core[name], `missing core export: ${name}`);
  for (const name of ['TelemetryChart', 'CodeSnippet', 'LogViewer', 'TreeView', 'CommandMenu', 'DataGrid']) assert(app[name], `missing app export: ${name}`);
  for (const name of ['DisplayHeading', 'FieldNote', 'SectionIntro', 'SiteFooter']) assert(site[name], `missing site export: ${name}`);
  assert(modules['./tokens'].theme.dark.accentText);
  const html = renderToString(h(core.DhaakonProvider, { theme: 'dark', locale: 'en-US' },
    h(core.Button, null, 'Run research'),
    h(core.Field, { label: 'Experiment', id: 'experiment' }, h(core.Input, { defaultValue: 'EXP-041' })),
    h(app.TelemetryChart, { title: 'Signal', labels: ['A', 'B'], series: [{ id: 's', label: 'Sample', values: [1, 2] }] }),
    h(app.CodeSnippet, { code: '{"fixture":true}' }),
    h(app.LogViewer, { entries: [] }),
  ));
  assert(html.includes('Run research') && html.includes('EXP-041') && html.includes('Signal'));
  assert(!html.includes('undefinedpx') && !html.includes('NaN'));
  console.log(`Packed @dhaakon/ui@${pkg.version}: ${packed.files.length} files, ${Object.keys(modules).length} ESM/declaration entry points, CSS/font assets and SSR smoke passed.`);
} finally {
  // Only the mkdtemp directory owned by this check is removed.
  await rm(temporary, { recursive: true, force: true });
}
