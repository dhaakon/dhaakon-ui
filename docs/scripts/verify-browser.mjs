import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { launchBrowser } from './browser.mjs';
import { serveBuiltDocs } from './server.mjs';

const here = dirname(fileURLToPath(import.meta.url));
const output = resolve(here, '../../test-results');
const registry = await readFile(resolve(here, '../src/lib/registry.ts'), 'utf8');
const slugs = [...registry.matchAll(/\bslug:\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
assert(slugs.length > 70 && new Set(slugs).size === slugs.length, 'catalogue parsing/unique routes');
const routes = ['/', '/install', '/foundations', '/components', '/showcase', '/workbench', '/editorial', '/accessibility', '/agent-skill', ...slugs.map((slug) => '/components/' + slug)];
const selectedRoutes = process.env.UI_CHECK_ROUTES ? routes.filter((route) => process.env.UI_CHECK_ROUTES.split(',').includes(route)) : routes;
assert(selectedRoutes.length, 'at least one route must be checked');
const axe = await readFile(resolve(here, '../../node_modules/axe-core/axe.min.js'), 'utf8');
const server = process.argv[2] ? null : await serveBuiltDocs(resolve(here, '../dist'));
const base = process.argv[2] ?? server.url;
const browser = await launchBrowser();
const report = { base, routes: [], interactions: [], failures: [], accessibility: [], metrics: {} };
await mkdir(output, { recursive: true });

async function until(expression, label, timeout = 12000) {
  const deadline = Date.now() + timeout;
  do {
    if (await browser.evaluate(expression)) return;
    await delay(80);
  } while (Date.now() < deadline);
  throw new Error('Timed out: ' + label);
}
async function navigate(route) {
  await browser.send('Page.navigate', { url: base + '/#' + route });
  await until("document.querySelector('main')?.dataset.route === " + JSON.stringify(route) + " && document.querySelector('main h1') && !document.querySelector('main .doc-loading')", route + ' content');
  if (route.startsWith('/components/')) {
    await until("document.querySelector('[data-demo-error]') || (document.querySelector('.doc-demo__stage')?.childElementCount > 0 && !document.querySelector('.doc-demo__stage .doc-loading'))", route + ' example');
  }
  await browser.evaluate('document.fonts.ready.then(() => true)');
  await delay(100);
}
async function clickText(text) {
  const expression = "(() => { const el = [...document.querySelectorAll('button')].find(el => el.textContent.trim() === " + JSON.stringify(text) + "); if (!el || el.disabled) return null; el.scrollIntoView({block:'center'}); const r=el.getBoundingClientRect(); return {x:r.left+r.width/2,y:r.top+r.height/2}; })()";
  const point = await browser.evaluate(expression);
  assert(point, 'enabled button not found: ' + text);
  await browser.send('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
  await browser.send('Input.dispatchMouseEvent', { type: 'mousePressed', ...point, button: 'left', clickCount: 1 });
  await browser.send('Input.dispatchMouseEvent', { type: 'mouseReleased', ...point, button: 'left', clickCount: 1 });
  await delay(100);
}
async function key(key, code = key) {
  const windowsVirtualKeyCode = { Enter: 13, Escape: 27, ArrowDown: 40, ArrowUp: 38, ArrowLeft: 37, ArrowRight: 39, ' ': 32, Tab: 9 }[key];
  await browser.send('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode });
  await browser.send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode });
}
async function capture(name) {
  const shot = await browser.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await writeFile(resolve(output, name + '.png'), Buffer.from(shot.data, 'base64'));
}
async function check(label, task) {
  try { await task(); report.interactions.push(label); console.log('PASS ' + label); }
  catch (error) { report.failures.push({ label, message: error.message }); console.log('FAIL ' + label + ': ' + error.message); }
}

try {
  await browser.send('Page.enable');
  await browser.send('Runtime.enable');
  await browser.send('Network.enable');
  await browser.send('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await browser.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }, { name: 'prefers-color-scheme', value: 'light' }] });
  await navigate('/');
  report.metrics.initialJsDecodedBytes = await browser.evaluate("performance.getEntriesByType('resource').filter(e => /\\.js(?:\\?|$)/.test(e.name)).reduce((sum, e) => sum + e.decodedBodySize, 0)");
  if (server) await check('Built overview JavaScript stays below 650 KB', () => {
    assert(report.metrics.initialJsDecodedBytes < 650000, 'overview eager-load regression');
  });
  await check('Bundled IBM Plex font faces load without fallback', async () => {
    const fonts = await browser.evaluate("Promise.all([...document.fonts].filter(face => face.family.includes('IBM Plex')).map(async face => { await face.load(); return {family:face.family,status:face.status}; }))");
    assert.equal(fonts.length, 13, 'missing declared Plex faces');
    assert(fonts.every(face => face.status === 'loaded'), 'font asset failed to load');
    report.metrics.loadedPlexFaces = fonts.length;
  });
  await capture('home-desktop');
  console.log('Checking ' + selectedRoutes.length + ' routes at ' + base);
  for (const route of selectedRoutes) {
    try {
      await navigate(route);
      const state = await browser.evaluate("({ heading: document.querySelector('main h1')?.textContent, errors: [...document.querySelectorAll('[data-demo-error]')].map(el => el.dataset.demoError), overflow: document.documentElement.scrollWidth > innerWidth + 1, nested: document.querySelectorAll('a button, button a, button button').length })");
      assert(state.heading && !state.errors.length, 'missing/failed example: ' + JSON.stringify(state.errors));
      assert(!state.overflow, 'desktop horizontal page overflow');
      assert.equal(state.nested, 0, 'nested interactive elements');
      if (route === '/agent-skill') await capture('agent-skill-ui');
      if (route.startsWith('/components/')) {
        await clickText('Show code');
        await until("!!document.querySelector('.doc-demo pre code') || !!document.querySelector('.doc-demo [role=alert]')", route + ' source');
        assert(await browser.evaluate("!!document.querySelector('.doc-demo pre code')"), 'missing demo source');
      }
      await browser.evaluate(axe);
      for (const theme of ['light', 'dark']) {
        await browser.evaluate("void document.documentElement.setAttribute('data-theme', " + JSON.stringify(theme) + ")");
        await delay(80);
        const violations = await browser.evaluate("axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a','wcag2aa','wcag21aa','best-practice'] } }).then(result => result.violations.map(v => ({ id: v.id, impact: v.impact, description: v.description, nodes: v.nodes.map(n => ({target: n.target, summary: n.failureSummary})).slice(0, 10) })))");
        if (violations.length) report.accessibility.push({ route, theme, violations });
      }
      await browser.evaluate("void document.documentElement.setAttribute('data-theme', 'light')");
      report.routes.push({ route, ok: true });
    } catch (error) {
      report.routes.push({ route, ok: false, error: error.message });
      report.failures.push({ label: route, message: error.message });
      console.log('FAIL ' + route + ': ' + error.message);
    }
    if (report.routes.length % 10 === 0) console.log('Routes ' + report.routes.length + '/' + selectedRoutes.length);
  }

  await check('Modal trigger, Escape and focus restoration', async () => {
    await navigate('/components/modal');
    await browser.evaluate("void [...document.querySelectorAll('button')].find(el => el.textContent.trim() === 'Spawn agent').focus()");
    await key('Enter');
    await until("!!document.querySelector('[role=dialog]')", 'open modal');
    await until("document.querySelector('[role=dialog]')?.contains(document.activeElement)", 'modal focus setup');
    assert(await browser.evaluate("!!document.querySelector('[role=dialog]').closest('[data-dhk-portal]')"), 'overlay lost provider portal scope');
    await key('Escape');
    await until("!document.querySelector('[role=dialog]')", 'Escape close');
    await until("document.activeElement?.textContent.trim() === 'Spawn agent'", 'trigger focus return');
  });
  await check('Command search filters and keyboard executes', async () => {
    await navigate('/components/command-menu');
    await clickText('Open command menu (⌘K)');
    await until("!!document.querySelector('input[aria-label=\"Search commands\"]')", 'command input');
    await browser.evaluate("void document.querySelector('input[aria-label=\"Search commands\"]').focus()");
    await browser.send('Input.insertText', { text: 'dashboard' });
    await until("document.querySelectorAll('[role=option]').length === 1", 'filtered commands');
    await key('ArrowDown');
    await key('Enter');
    await until("!document.querySelector('[role=dialog]')", 'command closes after action');
  });
  await check('SearchField label and description association', async () => {
    await navigate('/components/search-field');
    const ax = await browser.send('Accessibility.getFullAXTree');
    const field = ax.nodes.find((node) => node.role?.value === 'searchbox' && node.name?.value.toLowerCase() === 'find a container');
    assert(field, 'visual label is not the accessible name');
    assert(field.description?.value.includes('Escape clears'), 'description is not associated');
  });
  await check('Slider thumbs sit on the centre line of their track', async () => {
    await navigate('/components/slider');
    const offsets = await browser.evaluate("[...document.querySelectorAll('.dhk-slider__thumb')].map((thumb) => { const t = thumb.getBoundingClientRect(); const track = thumb.closest('.dhk-slider__track'); const r = track.getBoundingClientRect(); const fill = track.querySelector('.dhk-slider__fill').getBoundingClientRect(); return [t.top + t.height / 2 - (r.top + r.height / 2), t.top + t.height / 2 - (fill.top + fill.height / 2)]; })");
    assert(offsets.length >= 3, 'expected single and range sliders, found ' + offsets.length + ' thumbs');
    const worst = Math.max(...offsets.flat().map(Math.abs));
    assert(worst <= 0.75, 'a thumb is ' + worst.toFixed(2) + 'px off the centre line of its track');
  });
  await check('Workbench runs, completes, filters and inspects local evidence', async () => {
    await navigate('/workbench');
    await clickText('Run experiment ↗');
    await until("document.querySelector('.wb-announcement')?.textContent.includes('completed')", 'fixture completion', 10000);
    assert(await browser.evaluate("! [...document.querySelectorAll('button')].find(el => el.textContent.trim() === 'Export JSON ↗').disabled"), 'completed results not exportable');
    await clickText('Inspect manifest');
    await until("!!document.querySelector('[role=dialog]')", 'manifest drawer');
    await until("document.querySelector('[role=dialog]')?.contains(document.activeElement)", 'drawer focus setup');
    assert(await browser.evaluate("document.querySelector('[role=dialog] code')?.textContent.includes('\"source\": \"local-simulation\"')"), 'manifest provenance missing');
    await key('Escape');
    await until("!document.querySelector('[role=dialog]')", 'manifest close');
    await browser.evaluate("void document.querySelector('.wb-filters input[type=search]').focus()");
    await browser.send('Input.insertText', { text: 'no-such-experiment' });
    await until("!!document.querySelector('.wb-empty')", 'filter empty state');
    await clickText('Clear filters');
    assert.equal(await browser.evaluate("document.querySelectorAll('.wb-table tbody tr').length"), 5);
  });
  await check('Dark workbench accessibility and layout', async () => {
    await navigate('/workbench');
    await browser.evaluate("void document.querySelector('.doc-top__theme').click()");
    await delay(200);
    await capture('workbench-dark');
    await browser.evaluate(axe);
    const violations = await browser.evaluate("axe.run(document, {runOnly: {type:'tag',values:['wcag2a','wcag2aa','wcag21aa','best-practice']}}).then(r=>r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary})).slice(0,10)})))");
    if (violations.length) report.accessibility.push({ route: '/workbench', theme: 'dark', violations });
    assert.equal(await browser.evaluate("document.documentElement.scrollWidth > innerWidth + 1"), false);
  });
  await check('Nested themes, density, RTL and portalled inspector inheritance', async () => {
    await navigate('/accessibility');
    const surfaces = await browser.evaluate("['outer','nested'].map(scope => getComputedStyle(document.querySelector('#a11y-' + scope + '-scope')).backgroundColor)");
    assert.notEqual(surfaces[0], surfaces[1], 'nested light scope inherited dark surface');
    for (const label of ['Compact density', 'Arabic / right-to-left']) {
      assert(await browser.evaluate("(() => { const control = [...document.querySelectorAll('label.dhk-switch')].find(el=>el.textContent.trim()===" + JSON.stringify(label) + ")?.querySelector('input'); if (!control) return false; control.focus(); return true; })()"), label);
      await key(' ', 'Space');
      await delay(150);
    }
    await until("document.querySelector('#a11y-outer-scope').closest('.dhk-root').dir === 'rtl'", 'RTL locale');
    for (const [scope, label] of [['outer', 'Inspect outer theme'], ['nested', 'Inspect nested light theme']]) {
      await clickText(label);
      await until("document.querySelector('[role=dialog]')?.contains(document.activeElement)", scope + ' drawer focus');
      const state = await browser.evaluate("(() => {const content=document.querySelector('[data-inspector-scope=\"" + scope + "\"]'); const host=content.closest('[data-dhk-portal]');return {direction:getComputedStyle(content).direction,height:getComputedStyle(host).getPropertyValue('--dhk-control-height-md').trim(),surface:getComputedStyle(host).getPropertyValue('--dhk-surface-raised').trim()};})()");
      assert.equal(state.direction, 'rtl');
      assert.equal(state.height, '2rem');
      assert.equal(state.surface.toLowerCase(), scope === 'outer' ? '#1b1b18' : '#faf9f5');
      await key('Escape');
      await until("!document.querySelector('[role=dialog]')", scope + ' drawer close');
      await until("document.activeElement?.textContent.trim() === " + JSON.stringify(label), scope + ' focus return');
    }
  });
  await check('Mobile routes fit at 390px and navigation is a keyboard disclosure', async () => {
    await browser.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await navigate('/');
    assert(await browser.evaluate("document.querySelector('main').getBoundingClientRect().top < 180"), 'mobile content hidden after sidebar');
    assert(await browser.evaluate("getComputedStyle(document.querySelector('.doc-side')).display === 'none'"), 'mobile sidebar not collapsed');
    await browser.evaluate("void document.querySelector('.doc-menu-toggle').click()");
    assert(await browser.evaluate("document.querySelector('.doc-menu-toggle').getAttribute('aria-expanded') === 'true'"));
    await browser.evaluate("void document.querySelector('#doc-search').focus()");
    await key('Escape');
    assert(await browser.evaluate("document.activeElement === document.querySelector('.doc-menu-toggle')"));
    for (const route of ['/', '/workbench', '/editorial', '/accessibility', '/agent-skill', '/foundations', '/showcase', '/components/multi-select', '/components/drawer', '/components/telemetry-chart', '/components/verification-code']) {
      await navigate(route);
      assert(await browser.evaluate("document.documentElement.scrollWidth <= innerWidth + 1"), route + ' mobile overflow');
    }
    await navigate('/');
    await capture('home-mobile');
    await navigate('/workbench');
    await capture('workbench-mobile');
  });
  await check('Reduced motion keeps data and essential content available', async () => {
    await navigate('/workbench');
    assert(await browser.evaluate("matchMedia('(prefers-reduced-motion: reduce)').matches"));
    assert(await browser.evaluate("document.querySelector('.wb-console').textContent.includes('Signal gain')"));
    assert(await browser.evaluate("!!document.querySelector('.dhk-chart details summary')"));
  });
  const runtimeErrors = browser.events.filter((event) => event.method === 'Runtime.exceptionThrown').map((event) => event.params.exceptionDetails.exception?.description ?? event.params.exceptionDetails.text);
  for (const message of new Set(runtimeErrors)) report.failures.push({ label: 'uncaught browser error', message });
} finally {
  await browser.close();
  await server?.close();
  await writeFile(resolve(output, 'browser-report.json'), JSON.stringify(report, null, 2));
}
console.log(JSON.stringify({ routes: report.routes.length, interactions: report.interactions.length, failures: report.failures.length, accessibilityPages: report.accessibility.length, metrics: report.metrics }, null, 2));
if (report.failures.length || report.accessibility.length) process.exitCode = 1;
