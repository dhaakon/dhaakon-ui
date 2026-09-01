import { Link } from 'react-router-dom';
import { Badge } from '@dhaakon/ui';
import { CATEGORIES, COMPONENTS, LAYERS, byLayer } from '../lib/registry';
import { Prose } from '../parts/Prose';

export function ComponentIndex() {
  return (
    <>
      <h1 className="doc-h1">Components</h1>
      <p className="doc-lede">
        {COMPONENTS.length} pages across two layers. Those marked <Badge>aria</Badge> are built on
        React Aria — keyboard behaviour, focus management and screen-reader semantics come from
        Adobe's primitives, and everything in this kit is appearance.
      </p>

      {LAYERS.map((layer) => {
        const inLayer = byLayer(layer.id);
        if (!inLayer.length) return null;
        return (
          <section key={layer.id}>
            <h2 className="doc-h2">{layer.label}</h2>
            <p className="doc-p" style={{ marginTop: 0 }}>
              {layer.blurb} Imported from <code className="doc-inline">{layer.entry}</code>.
            </p>
            {CATEGORIES.map((cat) => {
              const items = inLayer.filter((c) => c.category === cat);
              if (!items.length) return null;
              return (
                <div key={cat}>
                  <h3 className="dhk-eyebrow" style={{ margin: '1.5rem 0 0.75rem' }}>{cat}</h3>
                  <div className="doc-grid">
                    {items.map((c) => (
                      <Link key={c.slug} to={`/components/${c.slug}`}>
                        <span className="doc-grid__name">{c.name}</span>
                        <Prose as="span" className="doc-grid__sum">{c.summary}</Prose>
                        <span style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: 'auto' }}>
                          {c.aria && <Badge tone="accent">aria</Badge>}
                          <Badge>{c.exports.length} export{c.exports.length > 1 ? 's' : ''}</Badge>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>
        );
      })}
    </>
  );
}
