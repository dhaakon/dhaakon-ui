import { Alert } from '@dhaakon/ui';
import { CodeBlock } from '../parts/CodeBlock';
import { STORYBOOK_URL } from '../lib/registry';

export function Install() {
  return (
    <>
      <h1 className="doc-h1">Install</h1>
      <p className="doc-lede">
        <code className="doc-inline">@dhaakon/ui</code> is published on npm. Install it, import the
        stylesheet once, and wrap your tree in the provider.
      </p>
      <Alert tone="info" title={`Source documentation · v${__KIT_VERSION__}`}>
        This site documents the current source build, which can be ahead of the latest npm release.
        Check <a href="https://www.npmjs.com/package/@dhaakon/ui">the published version</a> before
        relying on a newly documented API.
      </Alert>

      <h2 className="doc-h2">1 · Install</h2>
      <CodeBlock standalone code={`npm install @dhaakon/ui\n# or: pnpm add @dhaakon/ui · yarn add @dhaakon/ui`} />
      <p className="doc-p">
        <code className="doc-inline">react-aria-components</code>, its matched <code className="doc-inline">react-aria</code> dependency, <code className="doc-inline">clsx</code>{' '}
        and <code className="doc-inline">tailwind-merge</code> come along as dependencies. React 18 or 19
        is a peer. <code className="doc-inline">lucide-react</code> is optional.
      </p>
      <h2 className="doc-h2">2 · Import the stylesheet, once</h2>
      <p className="doc-p">
        One import carries the tokens, the IBM Plex faces and every component's styles. There is no
        Tailwind or PostCSS requirement — it is plain CSS with custom properties.
      </p>
      <CodeBlock
        standalone
        code={`// main.tsx — at the app entry, before your own styles
import '@dhaakon/ui/styles.css';`}
      />

      <h2 className="doc-h2">3 · Wrap the tree</h2>
      <p className="doc-p">
        <code className="doc-inline">DhaakonProvider</code> establishes the{' '}
        <code className="doc-inline">.dhk-root</code> baseline — Plex, the paper ground,{' '}
        <code className="doc-inline">box-sizing</code> — and mounts the toast host. Scoping it to a
        subtree is fine; it will not leak into the rest of an existing app.
      </p>
      <CodeBlock
        standalone
        code={`import { DhaakonProvider } from '@dhaakon/ui';

createRoot(el).render(
  <DhaakonProvider>
    <App />
  </DhaakonProvider>,
);`}
      />

      <h2 className="doc-h2">Theming</h2>
      <p className="doc-p">
        Set <code className="doc-inline">data-theme="dark"</code> on <code className="doc-inline">&lt;html&gt;</code>,
        add <code className="doc-inline">.dhk-dark</code> to a subtree, or pass{' '}
        <code className="doc-inline">theme="dark"</code> to the provider. With none of those it follows{' '}
        <code className="doc-inline">prefers-color-scheme</code>.
      </p>
      <p className="doc-p">
        Explicit provider themes nest, including their overlay portals. Add <code className="doc-inline">density="compact"</code>{' '}
        for dense controls or <code className="doc-inline">locale="ar-EG"</code> for right-to-left formatting and interaction.
      </p>
      <p className="doc-p">
        Override any token in your own stylesheet — they are ordinary custom properties:
      </p>
      <CodeBlock
        standalone
        code={`:root {
  --dhk-accent: #1843cf;
  --dhk-accent-hover: #1234a8;
  --dhk-text-on-accent: #ffffff; /* change the foreground together */
  --dhk-radius: 4px;       /* soften the corners */
}`}
      />

      <h2 className="doc-h2">Tailwind v4 projects</h2>
      <p className="doc-p">
        Optional. Pulls the tokens in as utilities — <code className="doc-inline">bg-paper</code>,{' '}
        <code className="doc-inline">text-ink</code>, <code className="doc-inline">font-mono</code>.
      </p>
      <CodeBlock standalone code={`@import 'tailwindcss';\n@import '@dhaakon/ui/theme.css';`} />

      <h2 className="doc-h2">Entry points</h2>
      <CodeBlock
        standalone
        code={`import { Button }        from '@dhaakon/ui';        // app components
import { DisplayHeading } from '@dhaakon/ui/site';   // dhaakon.com page patterns
import { tokens }         from '@dhaakon/ui/tokens'; // tokens as data, no React
import                         '@dhaakon/ui/styles.css';
import                         '@dhaakon/ui/theme.css';`}
      />

      <h2 className="doc-h2">Publishing a new version</h2>
      <CodeBlock
        standalone
        code={`npm --prefix docs run build
npm --prefix docs run check:routes
# Update CHANGELOG.md, bump the version, commit and tag.
npm publish        # runs npm run check first; publishes publicly to npmjs`}
      />
      <p className="doc-p">
        Storybook is the workshop for building components; it lives at{' '}
        <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">{STORYBOOK_URL}</a> and carries the
        generated props tables and the accessibility checks.
      </p>
    </>
  );
}
