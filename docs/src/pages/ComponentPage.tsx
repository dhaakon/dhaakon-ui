import { Link, useParams } from 'react-router-dom';
import { Badge, Button, EmptyState } from '@dhaakon/ui';
import { CtaLink } from '@dhaakon/ui/site';
import { COMPONENTS, STORYBOOK_URL, findComponent, getDemo, getDemoSource } from '../lib/registry';
import { Demo } from '../parts/Demo';
import { CodeBlock } from '../parts/CodeBlock';
import { Prose } from '../parts/Prose';

export function ComponentPage() {
  const { slug = '' } = useParams();
  const doc = findComponent(slug);

  if (!doc) {
    return (
      <EmptyState
        title="No such component"
        description={`Nothing is registered under "${slug}".`}
        actions={<Link to="/components"><Button>All components</Button></Link>}
      />
    );
  }

  const index = COMPONENTS.indexOf(doc);
  const next = COMPONENTS[index + 1];
  const prev = COMPONENTS[index - 1];

  return (
    <>
      <div className="dhk-eyebrow" style={{ marginBottom: '0.75rem' }}>{doc.category}</div>
      <h1 className="doc-h1">{doc.name}</h1>
      <p className="doc-lede">{doc.summary}</p>

      <div className="doc-chips" style={{ marginTop: '1.5rem' }}>
        {doc.aria && <Badge tone="accent" solid>React Aria</Badge>}
        {doc.exports.map((e) => <Badge key={e}>{e}</Badge>)}
      </div>

      {doc.guidance && <Prose className="doc-note">{doc.guidance}</Prose>}

      <h2 className="doc-h2">Example</h2>
      <Demo component={getDemo(doc)} source={getDemoSource(doc)} />

      <h2 className="doc-h2">Import</h2>
      <CodeBlock standalone code={`import { ${doc.exports.join(', ')} } from '@dhaakon/ui';`} />

      <h2 className="doc-h2">Props &amp; controls</h2>
      <p className="doc-p">
        Full prop tables are generated from the TypeScript types in Storybook, alongside an
        interactive playground and an automated accessibility check.
      </p>
      {doc.storybook && (
        <CtaLink
          href={`${STORYBOOK_URL}/?path=/docs/${doc.storybook.split('--')[0]}--docs`}
          target="_blank"
          rel="noreferrer"
        >
          {doc.name} in Storybook
        </CtaLink>
      )}

      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          marginTop: '4rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--dhk-border)',
        }}
      >
        {prev ? (
          <Link to={`/components/${prev.slug}`}><Button variant="ghost">← {prev.name}</Button></Link>
        ) : <span />}
        {next && (
          <Link to={`/components/${next.slug}`}><Button variant="ghost">{next.name} →</Button></Link>
        )}
      </nav>
    </>
  );
}
