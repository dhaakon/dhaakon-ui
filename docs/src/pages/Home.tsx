import { Link } from 'react-router-dom';
import { Badge, Button, Card, CardBody } from '@dhaakon/ui';
import { DisplayHeading, SectionIntro, NumberedList, NumberedItem, CtaLink } from '@dhaakon/ui/site';
import { COMPONENTS } from '../lib/registry';
import { CodeBlock } from '../parts/CodeBlock';

const ariaCount = COMPONENTS.filter((c) => c.aria).length;

export function Home() {
  return (
    <>
      <DisplayHeading
        as="h1"
        style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
        annotations={[
          { text: '@dhaakon/ui', glyph: 'arrow-ne', x: 1, y: -22 },
          { text: 'React Aria', glyph: 'target', x: 62, y: 104 },
        ]}
      >
        One language,
        <br />
        site to app.
      </DisplayHeading>

      <p className="doc-lede" style={{ marginTop: '2.5rem' }}>
        The design system and React component library for the dhaakon-network.
        Its visual language comes from <strong>dhaakon.com</strong>; its behaviour
        comes from <strong>React Aria</strong>.
      </p>

      <div className="doc-chips" style={{ marginTop: '2rem' }}>
        <Badge tone="accent" solid>{COMPONENTS.length} components</Badge>
        <Badge>{ariaCount} on React Aria</Badge>
        <Badge>IBM Plex</Badge>
        <Badge>Light + dark</Badge>
        <Badge>Zero-config CSS</Badge>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
        <Link to="/components"><Button variant="accent">Browse components</Button></Link>
        <Link to="/install"><Button variant="outline">Install</Button></Link>
      </div>

      <h2 className="doc-h2">The shape of it</h2>
      <SectionIntro
        index="01"
        eyebrow="Design language"
        title="Warm paper, near-black ink, hairlines."
        lead="Sharp corners everywhere — the only curve in the system is a full circle. IBM Plex Sans for UI, Serif for editorial, Mono for identifiers, Condensed for the uppercase labels. One decisive accent."
      />

      <h2 className="doc-h2">Three layers</h2>
      <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(16rem, 1fr))' }}>
        <Card>
          <CardBody>
            <div className="dhk-eyebrow" style={{ marginBottom: '0.5rem' }}>@dhaakon/ui</div>
            <p className="doc-grid__sum">
              Primitives — buttons, forms, tables, overlays. What screens are built from.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="dhk-eyebrow" style={{ marginBottom: '0.5rem' }}>@dhaakon/ui/app</div>
            <p className="doc-grid__sum">
              Composites — shells, page headers, metric bands, data grids, command menus,
              whole login and error pages. Assembled from the primitives.
            </p>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <div className="dhk-eyebrow" style={{ marginBottom: '0.5rem' }}>@dhaakon/ui/site</div>
            <p className="doc-grid__sum">
              The editorial patterns lifted from dhaakon.com — display headings, numbered lists,
              programme cards, field notes. What you build pages from.
            </p>
          </CardBody>
        </Card>
      </div>

      <h2 className="doc-h2">Why React Aria</h2>
      <NumberedList>
        <NumberedItem index="01" title="Accessibility is behaviour, not markup" equation="ARIA ≠ accessible" sign="−" defaultOpen>
          A <code className="doc-inline">role="listbox"</code> does nothing on its own. Typeahead, roving
          tabindex, focus restoration and collision-aware positioning are what make a Select usable —
          and they are where hand-rolled components quietly fail.
        </NumberedItem>
        <NumberedItem index="02" title="Styling stays ours" equation="Behaviour ≠ appearance" sign="+">
          React Aria ships unstyled primitives that expose their state as
          <code className="doc-inline">data-*</code> attributes. Every rule in this kit is plain CSS keyed
          off those states, so the tokens remain the single source of truth.
        </NumberedItem>
        <NumberedItem index="03" title="It is externalised, not bundled" equation="One copy" sign="+">
          <code className="doc-inline">react-aria-components</code> is a dependency, not inlined — apps
          that use it directly share one copy.
        </NumberedItem>
      </NumberedList>

      <h2 className="doc-h2">Sixty seconds</h2>
      <CodeBlock
        standalone
        code={`import '@dhaakon/ui/styles.css';
import { DhaakonProvider, Button, Select, SelectItem } from '@dhaakon/ui';

export function App() {
  return (
    <DhaakonProvider>
      <Select label="Region" placeholder="Choose a region">
        <SelectItem id="nuc">homelab-nuc-1</SelectItem>
      </Select>
      <Button variant="accent">Engage</Button>
    </DhaakonProvider>
  );
}`}
      />

      <CtaLink href="#/install">Full install guide</CtaLink>
    </>
  );
}
