import { Link } from 'react-router-dom';
import { Badge } from '@dhaakon/ui';
import { CATEGORIES, COMPONENTS } from '../lib/registry';

export function ComponentIndex() {
  return (
    <>
      <h1 className="doc-h1">Components</h1>
      <p className="doc-lede">
        {COMPONENTS.length} components. Those marked <Badge>aria</Badge> are built on React Aria —
        keyboard behaviour, focus management and screen-reader semantics come from Adobe's primitives,
        and everything in this kit is appearance.
      </p>

      {CATEGORIES.map((cat) => {
        const items = COMPONENTS.filter((c) => c.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat}>
            <h2 className="doc-h2">{cat}</h2>
            <div className="doc-grid">
              {items.map((c) => (
                <Link key={c.slug} to={`/components/${c.slug}`}>
                  <span className="doc-grid__name">{c.name}</span>
                  <span className="doc-grid__sum">{c.summary}</span>
                  <span style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                    {c.aria && <Badge tone="accent">aria</Badge>}
                    <Badge>{c.exports.length} export{c.exports.length > 1 ? 's' : ''}</Badge>
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
