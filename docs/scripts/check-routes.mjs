#!/usr/bin/env node
/*
 * Walks every route in the built docs site and fails if any of them breaks.
 *
 * The gallery has ~75 pages, each rendering a live demo, so eyeballing a few
 * screenshots does not prove the site works — a demo that throws only shows up
 * when that one page is opened. This renders all of them.
 *
 * Detects two failures:
 *   - a demo that threw, caught by DemoErrorBoundary (`data-demo-error`)
 *   - a page that rendered nothing, i.e. the app itself came down
 *
 * Uses headless Chrome's --dump-dom, so there is no browser-automation
 * dependency to keep in step with the browser.
 *
 *   node scripts/check-routes.mjs [baseUrl]
 */
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { promisify } from 'node:util';

const run = promisify(execFile);
const here = dirname(fileURLToPath(import.meta.url));
const BASE = process.argv[2] ?? 'http://localhost:6098';
const CHROME = process.env.CHROME_BIN ?? 'google-chrome';
const CONCURRENCY = 4;

const STATIC_ROUTES = ['/', '/install', '/foundations', '/components', '/showcase'];

async function routes() {
  const registry = await readFile(join(here, '..', 'src', 'lib', 'registry.ts'), 'utf8');
  // Entries are written both one-field-per-line and inline, so do not anchor.
  const slugs = [...registry.matchAll(/\bslug: '([^']+)'/g)].map((m) => m[1]);
  const declared = (registry.match(/\bname: '/g) ?? []).length;
  if (slugs.length !== declared) {
    throw new Error(`parsed ${slugs.length} slugs but ${declared} entries — the registry parse is wrong`);
  }
  return [...STATIC_ROUTES, ...slugs.map((s) => `/components/${s}`)];
}

async function render(route) {
  const url = `${BASE}/#${route}`;
  const { stdout } = await run(
    CHROME,
    [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      // Give the demos a moment to mount and their tweens to start.
      '--virtual-time-budget=4000',
      '--dump-dom',
      url,
    ],
    { maxBuffer: 32 << 20, timeout: 60_000 },
  );
  return stdout;
}

function inspect(route, dom) {
  const failed = [...dom.matchAll(/data-demo-error="([^"]*)"/g)].map((m) => m[1] || 'demo');
  if (failed.length) return { route, ok: false, why: `demo threw: ${failed.join(', ')}` };
  // Every page renders the sidebar; its absence means the tree came down.
  if (!dom.includes('doc-side')) return { route, ok: false, why: 'page rendered empty' };
  return { route, ok: true };
}

const all = await routes();
console.log(`checking ${all.length} routes against ${BASE}`);

const results = [];
for (let i = 0; i < all.length; i += CONCURRENCY) {
  const batch = all.slice(i, i + CONCURRENCY);
  const settled = await Promise.all(
    batch.map(async (route) => {
      try {
        return inspect(route, await render(route));
      } catch (e) {
        return { route, ok: false, why: `render failed: ${e.message.split('\n')[0]}` };
      }
    }),
  );
  for (const r of settled) {
    results.push(r);
    if (!r.ok) console.log(`  FAIL ${r.route} — ${r.why}`);
  }
  process.stdout.write(`  …${results.length}/${all.length}\r`);
}

const failures = results.filter((r) => !r.ok);
console.log(`\n${results.length - failures.length}/${results.length} routes ok`);
if (failures.length) {
  console.error(`${failures.length} failing:`);
  for (const f of failures) console.error(`  ${f.route} — ${f.why}`);
  process.exit(1);
}
