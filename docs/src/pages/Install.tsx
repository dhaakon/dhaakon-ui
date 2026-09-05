import { Alert } from '@dhaakon/ui';
import { CodeBlock } from '../parts/CodeBlock';
import { STORYBOOK_URL } from '../lib/registry';

export function Install() {
  return (
    <>
      <h1 className="doc-h1">Install</h1>
      <p className="doc-lede">
        The kit is published to the network Verdaccio, not npmjs — point the
        <code className="doc-inline">@dhaakon</code> scope at it once per project.
      </p>
      <Alert tone="info" title={`Source documentation · v${__KIT_VERSION__}`}>
        This site documents the current source build. Registry publishing is a separate step:
        check the published version before installing, or build and install a local tarball
        with <code className="doc-inline">npm run build &amp;&amp; npm pack</code>.
      </Alert>

      <h2 className="doc-h2">1 · Point the scope at the registry</h2>
      <p className="doc-p">
        Add an <code className="doc-inline">.npmrc</code> beside your{' '}
        <code className="doc-inline">package.json</code>. Which host to use depends on where{' '}
        <code className="doc-inline">npm install</code> actually runs.
      </p>
      <CodeBlock
        standalone
        code={`# On dhaakon-ubuntu, or from any machine on the tailnet
@dhaakon:registry=http://dhaakon-ubuntu:21760/

# Building inside a container — Docker's DNS does not know the host's
# name, so address it by the docker0 gateway instead
@dhaakon:registry=http://172.17.0.1:21760/`}
      />
      <Alert tone="warning" title="Not localhost">
        Inside a container <code className="doc-inline">localhost</code> is the container itself, and
        from another machine it is that machine — neither reaches the registry.
      </Alert>
      <Alert tone="info" title="Reading is anonymous">
        The <code className="doc-inline">@dhaakon/*</code> scope is readable without a token.
        Publishing needs a registry login.
      </Alert>

      <h2 className="doc-h2">2 · Install</h2>
      <CodeBlock standalone code={`npm install @dhaakon/ui`} />
      <p className="doc-p">
        <code className="doc-inline">react-aria-components</code>, its matched <code className="doc-inline">react-aria</code> dependency, <code className="doc-inline">clsx</code>{' '}
        and <code className="doc-inline">tailwind-merge</code> come along as dependencies. React 18 or 19
        is a peer.
      </p>

      <h2 className="doc-h2">3 · Import the stylesheet, once</h2>
      <p className="doc-p">
        One import carries the tokens, the IBM Plex faces and every component's styles. There is no
        Tailwind or PostCSS requirement — it is plain CSS with custom properties.
      </p>
      <CodeBlock
        standalone
        code={`// main.tsx — at the app entry, before your own styles
import '@dhaakon/ui/styles.css';`}
      />

      <h2 className="doc-h2">4 · Wrap the tree</h2>
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
        code={`npm run check
npm --prefix docs run build
npm --prefix docs run check:routes
# Review CHANGELOG.md, version, commit and tag before publishing.
# Registry publishing is an explicit release operation.`}
      />
      <p className="doc-p">
        Storybook is the workshop for building components; it lives at{' '}
        <a href={STORYBOOK_URL} target="_blank" rel="noreferrer">{STORYBOOK_URL}</a> and carries the
        generated props tables and the accessibility checks.
      </p>
    </>
  );
}
