import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const temporary = await mkdtemp(join(tmpdir(), 'dhaakon-ui-peers-'));
const registry = 'https://registry.npmjs.org';
const matrix = [
  { react: '18.3.1', reactTypes: '18.3.1', domTypes: '18.3.0' },
  { react: '19.2.0', reactTypes: '19.2.0', domTypes: '19.2.0' },
];

// These are generated fixtures inside each isolated consumer, not repository imports.
const typedConsumer = String.raw`
import { createRef, type MouseEvent } from 'react';
import {
  Button, DhaakonProvider, Field, Input, Select, SelectItem, ComboBox,
  MultiSelect, Modal, Tabs, TabList, Tab, TabPanel, Meter, Progress,
} from '@dhaakon/ui';
import {
  AppShell, CodeSnippet, TelemetryChart, LogViewer, TreeView,
  VerificationCodeInput, type TelemetrySeries,
} from '@dhaakon/ui/app';
import { DisplayHeading, FieldNote, SectionIntro } from '@dhaakon/ui/site';
import { theme } from '@dhaakon/ui/tokens';

const buttonRef = createRef<HTMLButtonElement>();
const inputRef = createRef<HTMLInputElement>();
const click = (event: MouseEvent<HTMLButtonElement>) => { event.currentTarget.disabled = true; };
const series: TelemetrySeries[] = [{ id: 'signal', label: 'Signal', values: [1, null, 3] }];
const tone: string = theme.dark.accentText;

export function Consumer() {
  return <DhaakonProvider locale="en-US" theme="dark" density="compact">
    <AppShell contentAs="section" contentLabel="Embedded research">
      <DisplayHeading as="h1">Research system</DisplayHeading>
      <SectionIntro title="Investigate the signal" lead={tone} />
      <FieldNote label="Fixture">Local peer compatibility fixture</FieldNote>
      <Button ref={buttonRef} disabled={false} aria-busy="true" onClick={click} onPress={() => {}}>Run research</Button>
      <Field label="Experiment" required><Input ref={inputRef} defaultValue="EXP-041" /></Field>
      <Select label="Region" defaultSelectedKey="local"><SelectItem id="local">Local</SelectItem></Select>
      <ComboBox label="Service"><SelectItem id="brain">Brain</SelectItem></ComboBox>
      <MultiSelect label="Capabilities" options={[{ id: 'svg', label: 'SVG' }]} defaultValue={['svg']} onChange={(keys) => { keys.map((key) => key.toUpperCase()); }} />
      <Modal trigger={<Button>Inspect</Button>} title="Inspection">Details</Modal>
      <Tabs defaultValue="overview" onValueChange={(value) => value.toUpperCase()}><TabList label="Views"><Tab value="overview">Overview</Tab></TabList><TabPanel value="overview">Run overview</TabPanel></Tabs>
      <Meter label="Storage" value={30} /><Progress label="Export" value={40} />
      <TelemetryChart title="Signal" labels={['A', 'B', 'C']} series={series} />
      <CodeSnippet code={'{"fixture":true}'} />
      <LogViewer entries={[]} />
      <TreeView label="Files" nodes={[{ id: 'root', label: 'Root' }]} />
      <VerificationCodeInput value="123" onChange={(value) => value.toUpperCase()} />
    </AppShell>
  </DhaakonProvider>;
}
`;

const ssrConsumer = String.raw`
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { realpathSync } from 'node:fs';
import { relative } from 'node:path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import * as core from '@dhaakon/ui';
import * as app from '@dhaakon/ui/app';
import * as site from '@dhaakon/ui/site';
import { theme } from '@dhaakon/ui/tokens';

const require = createRequire(import.meta.url);
const expected = process.env.EXPECTED_REACT_VERSION;
assert.equal(React.version, expected);
assert.equal(require('react-dom/package.json').version, expected);
const consumerReact = realpathSync(require.resolve('react'));
assert(!relative(process.cwd(), consumerReact).startsWith('..'), 'React must belong to the isolated consumer');
for (const name of ['@dhaakon/ui', 'react-aria-components', 'react-aria']) {
  const dependent = createRequire(import.meta.resolve(name));
  assert.equal(realpathSync(dependent.resolve('react')), consumerReact, name + ' must use the consumer React instance');
}
assert(theme.dark.accentText);
const h = React.createElement;
const html = renderToString(h(core.DhaakonProvider, { theme: 'dark', locale: 'en-US' },
  h(app.AppShell, { contentAs: 'section', contentLabel: 'Research surface' },
    h(site.DisplayHeading, { as: 'h1' }, 'Research system'),
    h(site.SectionIntro, { title: 'Investigate the signal' }),
    h(site.FieldNote, { label: 'Fixture' }, 'Original editorial surface'),
    h(core.Button, { 'aria-busy': true }, 'Run research'),
    h(core.Field, { label: 'Experiment', id: 'experiment' }, h(core.Input, { defaultValue: 'EXP-041' })),
    h(core.Select, { label: 'Region', defaultSelectedKey: 'local' }, h(core.SelectItem, { id: 'local' }, 'Local')),
    h(core.MultiSelect, { label: 'Capabilities', options: [{ id: 'svg', label: 'SVG' }], defaultValue: ['svg'] }),
    h(core.Meter, { label: 'Storage', value: 30 }),
    h(core.Progress, { label: 'Export', value: 40 }),
    h(app.TelemetryChart, { title: 'Signal', labels: ['A', 'B'], series: [{ id: 's', label: 'Sample', values: [1, 2] }] }),
    h(app.CodeSnippet, { code: '{"fixture":true}' }),
    h(app.LogViewer, { entries: [] }),
    h(app.TreeView, { label: 'Files', nodes: [{ id: 'root', label: 'Root' }] }),
    h(app.VerificationCodeInput, { value: '123' }),
  ),
));
for (const text of ['Research system', 'Investigate the signal', 'Original editorial surface', 'Run research', 'EXP-041', 'Region', 'Capabilities', 'Signal']) {
  assert(html.includes(text), 'Missing SSR surface: ' + text);
}
assert(!html.includes('undefinedpx') && !html.includes('NaN'));
assert(html.includes('role="meter"') && html.includes('aria-busy="true"'));
console.log(JSON.stringify({
  react: React.version,
  reactDom: require('react-dom/package.json').version,
  reactTypes: require('@types/react/package.json').version,
  domTypes: require('@types/react-dom/package.json').version,
  kit: JSON.parse(await (await import('node:fs/promises')).readFile(new URL('./node_modules/@dhaakon/ui/package.json', import.meta.url), 'utf8')).version,
  htmlBytes: Buffer.byteLength(html),
  isolatedReactResolution: true,
  surfaces: ['core', 'app', 'site', 'tokens'],
}));
`;

try {
  // Never publish or run lifecycle scripts; test the same current built tarball twice.
  const { stdout } = await run('npm', ['pack', '--ignore-scripts', '--json', '--pack-destination', temporary], { cwd: root });
  const [packed] = JSON.parse(stdout);
  const tarball = join(temporary, packed.filename);
  const sha256 = createHash('sha256').update(await readFile(tarball)).digest('hex');
  console.log(`Checking packed @dhaakon/ui@${packed.version}, SHA-256 ${sha256}`);

  const results = await Promise.allSettled(matrix.map(async ({ react, reactTypes, domTypes }) => {
    const consumer = join(temporary, `react-${react}`);
    await mkdir(consumer);
    await writeFile(join(consumer, 'package.json'), JSON.stringify({ name: `dhaakon-ui-peer-${react}`, version: '0.0.0', private: true, type: 'module' }));
    await writeFile(join(consumer, 'consumer.tsx'), typedConsumer);
    await writeFile(join(consumer, 'ssr.mjs'), ssrConsumer);
    const options = { cwd: consumer, env: { ...process.env, NODE_PATH: '', EXPECTED_REACT_VERSION: react }, maxBuffer: 8 * 1024 * 1024 };
    try {
      await run('npm', [
        'install', '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false',
        '--userconfig=/dev/null', `--registry=${registry}`, tarball,
        `react@${react}`, `react-dom@${react}`,
        `@types/react@${reactTypes}`, `@types/react-dom@${domTypes}`, 'typescript@5.9.3',
      ], options);
      await run('npm', ['ls', 'react', 'react-dom', '--json'], options);
      await run(process.execPath, [join(consumer, 'node_modules/typescript/bin/tsc'),
        '--noEmit', '--strict', '--skipLibCheck', 'false', '--jsx', 'react-jsx',
        '--module', 'ESNext', '--moduleResolution', 'Bundler', '--target', 'ES2022',
        '--lib', 'ES2022,DOM', '--types', 'react,react-dom', '--esModuleInterop',
        'consumer.tsx',
      ], options);
      const result = await run(process.execPath, ['ssr.mjs'], options);
      const report = { ...JSON.parse(result.stdout), declarations: 'strict; skipLibCheck=false', warnings: result.stderr.trim() || null };
      console.log(`React ${react}: isolated dependency tree, strict declarations and core/app/site SSR passed.`);
      return report;
    } catch (error) {
      error.message = `React ${react} consumer failed: ${error.message}\n${error.stdout ?? ''}\n${error.stderr ?? ''}`;
      throw error;
    }
  }));
  // Wait for both child consumers before cleanup, including on failure.
  const failures = results.filter((result) => result.status === 'rejected');
  if (failures.length) throw new AggregateError(failures.map((result) => result.reason), 'Peer compatibility checks failed');
  const reports = results.flatMap((result) => result.status === 'fulfilled' ? [result.value] : []);
  assert.equal(reports.length, matrix.length);
  console.log(JSON.stringify({ version: packed.version, sha256, consumers: reports }, null, 2));
} finally {
  // Only the unique directory owned by this check is removed, including failed fixtures.
  await rm(temporary, { recursive: true, force: true });
}
