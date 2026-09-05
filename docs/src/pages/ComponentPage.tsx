import { Link, useParams } from "react-router-dom";
import { Badge, EmptyState } from "@dhaakon/ui";
import { CtaLink } from "@dhaakon/ui/site";
import {
  COMPONENTS,
  MOTION_DOCS_URL,
  STORYBOOK_URL,
  entryFor,
  findComponent,
  getDemo,
  getDemoSource,
} from "../lib/registry";
import { Demo } from "../parts/Demo";
import { CodeBlock } from "../parts/CodeBlock";
import { Prose } from "../parts/Prose";

export function ComponentPage() {
  const { slug = "" } = useParams();
  const doc = findComponent(slug);

  if (!doc) {
    return (
      <EmptyState
        title="No such component"
        description={`Nothing is registered under "${slug}".`}
        actions={
          <Link className="doc-action" to="/components">
            All components ↗
          </Link>
        }
      />
    );
  }

  const index = COMPONENTS.indexOf(doc);
  const next = COMPONENTS[index + 1];
  const prev = COMPONENTS[index - 1];

  return (
    <>
      <div className="dhk-eyebrow" style={{ marginBottom: "0.75rem" }}>
        {doc.category}
      </div>
      <h1 className="doc-h1">{doc.name}</h1>
      <Prose className="doc-lede">{doc.summary}</Prose>

      <div className="doc-chips" style={{ marginTop: "1.5rem" }}>
        {doc.layer === "app" && <Badge solid>composite</Badge>}
        {doc.aria && (
          <Badge tone="accent" solid>
            React Aria
          </Badge>
        )}
        {doc.exports.map((e) => (
          <Badge key={e}>{e}</Badge>
        ))}
      </div>

      {doc.guidance && <Prose className="doc-note">{doc.guidance}</Prose>}

      <h2 className="doc-h2">Example</h2>
      <Demo
        key={doc.slug}
        component={getDemo(doc)}
        loadSource={() => getDemoSource(doc)}
        name={doc.name}
      />

      <h2 className="doc-h2">Import</h2>
      <CodeBlock
        standalone
        code={`import { ${doc.exports.join(", ")} } from '${entryFor(doc)}';`}
      />

      <h2 className="doc-h2">Reference</h2>
      {doc.layer === "motion" ? (
        <>
          <p className="doc-p">
            <code className="doc-inline">@dhaakon/motion</code> is a separate
            package with its own documentation and playground, including the
            full option reference for tweens and timelines.
          </p>
          <CtaLink href={MOTION_DOCS_URL} target="_blank" rel="noreferrer">
            {doc.name} in the motion docs
          </CtaLink>
        </>
      ) : (
        <>
          <p className="doc-p">
            TypeScript exports define the supported API. Where available,
            Storybook adds prop tables and controls. React Aria supplies
            behavior for the components marked above; application labels,
            content, contrast, and complete workflows still need testing.
          </p>
          {doc.storybook && (
            <CtaLink
              href={`${STORYBOOK_URL}/?path=/docs/${doc.storybook.split("--")[0]}--docs`}
              target="_blank"
              rel="noreferrer"
            >
              {doc.name} in Storybook
            </CtaLink>
          )}
        </>
      )}

      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "1rem",
          marginTop: "4rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid var(--dhk-border)",
        }}
      >
        {prev ? (
          <Link className="doc-text-link" to={`/components/${prev.slug}`}>
            ← {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link className="doc-text-link" to={`/components/${next.slug}`}>
            {next.name} →
          </Link>
        )}
      </nav>
    </>
  );
}
