import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import {
  Alert,
  Button,
  DhaakonProvider,
  Drawer,
  Field,
  Input,
  MultiSelect,
  NumberField,
  Switch,
} from '@dhaakon/ui';
import { CodeSnippet } from '@dhaakon/ui/app';

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
  gap: '1.25rem',
};
const panel: CSSProperties = {
  display: 'grid',
  gap: '1rem',
  minWidth: 0,
  padding: '1.25rem',
  border: '1px solid var(--dhk-border)',
  background: 'var(--dhk-surface-raised)',
  color: 'var(--dhk-text)',
};

interface ScopePanelProps {
  scope: 'outer' | 'nested';
  theme: 'light' | 'dark';
  locale: string;
  density: 'comfortable' | 'compact';
  budget: number;
  onBudgetChange: (value: number) => void;
}

function ScopePanel({ scope, theme, locale, density, budget, onBudgetChange }: ScopePanelProps) {
  const prefix = scope === 'outer' ? 'Outer' : 'Nested';
  const title = scope === 'outer' ? 'Outer scope inspector' : 'Light scope inspector';
  const formatted = Number.isFinite(budget) ? new Intl.NumberFormat(locale).format(budget) : 'No value entered';
  return (
    <section id={`a11y-${scope}-scope`} style={panel} aria-labelledby={`a11y-${scope}-heading`} lang="en">
      <h3 id={`a11y-${scope}-heading`} className="dhk-eyebrow" style={{ margin: 0 }}>
        {scope === 'outer' ? `${theme} outer scope` : 'Always-light nested scope'}
      </h3>
      <p className="dhk-mono" style={{ margin: 0, color: 'var(--dhk-text-muted)', fontSize: '.75rem' }}>
        {locale} · {density} · {locale === 'ar-EG' ? 'RTL' : 'LTR'}
      </p>
      <Field label={`${prefix} artifact name`} hint="Uncontrolled input: editing stays local to this field.">
        <Input defaultValue="study-0042" mono />
      </Field>
      <NumberField
        label={`${prefix} sample budget`}
        description="Controlled number: both scopes share the same value."
        value={budget}
        onChange={onBudgetChange}
        minValue={128}
        maxValue={4096}
        step={128}
      />
      <p style={{ margin: 0, fontSize: '.8125rem' }}>
        Localized value: <output aria-label={`${prefix} localized budget`}><bdi lang={locale}>{formatted}</bdi></output>
      </p>
      <Drawer
        title={title}
        description="A portalled dialog belonging to this provider, not to the page theme."
        trigger={<Button variant="outline">{scope === 'outer' ? 'Inspect outer theme' : 'Inspect nested light theme'}</Button>}
        footer={(close) => <Button onClick={close}>Return to the lab</Button>}
      >
        <div data-inspector-scope={scope} lang="en" style={{ display: 'grid', gap: '1.25rem' }}>
          <p className="doc-p" style={{ margin: 0 }}>
            This inspector should retain the originating <strong>{theme}</strong> theme,
            <strong> {density}</strong> density and <strong>{locale === 'ar-EG' ? 'right-to-left' : 'left-to-right'}</strong> direction.
          </p>
          <Field label={`${prefix} inspector note`} hint="Tab remains inside the dialog. Escape returns focus to its trigger.">
            <Input placeholder="Record an observation…" />
          </Field>
          <p style={{ margin: 0, color: 'var(--dhk-text-muted)' }}>
            Sample budget: <bdi lang={locale}>{formatted}</bdi>. This is a local interface fixture, not a running infrastructure task.
          </p>
        </div>
      </Drawer>
    </section>
  );
}

export function Accessibility() {
  const [dark, setDark] = useState(true);
  const [compact, setCompact] = useState(false);
  const [rtl, setRtl] = useState(false);
  const [budget, setBudget] = useState(1024);
  const [collections, setCollections] = useState<string[]>(['vector']);
  const [artifact, setArtifact] = useState('');
  const [validation, setValidation] = useState('Enter an artifact name, then validate the local draft.');
  const theme = dark ? 'dark' : 'light';
  const density = compact ? 'compact' : 'comfortable';
  const locale = rtl ? 'ar-EG' : 'en-US';
  const invalid = artifact.trim().length === 0;

  return (
    <>
      <div className="doc-kicker">Quality / interaction contracts</div>
      <h1 className="doc-h1">Accessibility is engineering.</h1>
      <p className="doc-lede">
        The visual surface is only half the kit. Names, focus, keyboard behavior, state ownership
        and readable output are part of the same instrument. Inspect them here, not just in a screenshot.
      </p>
      <Alert tone="info" title="Evidence, not certification">
        Component regressions and real-browser checks provide repeatable evidence. They do not certify
        every composition or replace testing with people who use assistive technology.
      </Alert>

      <section aria-labelledby="a11y-lab-heading">
        <h2 id="a11y-lab-heading" className="doc-h2">01 / Theme, locale and portal lab</h2>
        <p className="doc-p">
          Change the outer theme, density or locale. The inner provider stays light. Both number
          fields share controlled state; each text field keeps its own uncontrolled draft. Arabic
          locale changes direction and number formatting; the example instructions remain English.
        </p>
        <fieldset style={{ border: '1px solid var(--dhk-border)', padding: '1rem', margin: '0 0 1.25rem' }}>
          <legend className="dhk-eyebrow">Configure the lab</legend>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 1.5rem' }}>
            <Switch isSelected={dark} onChange={setDark}>Dark outer scope</Switch>
            <Switch isSelected={compact} onChange={setCompact}>Compact density</Switch>
            <Switch isSelected={rtl} onChange={setRtl}>Arabic / right-to-left</Switch>
          </div>
        </fieldset>
        <DhaakonProvider theme={theme} density={density} locale={locale} disableToasts>
          <div style={{ ...grid, padding: '1rem', border: '1px solid var(--dhk-border-strong)' }}>
            <ScopePanel scope="outer" theme={theme} locale={locale} density={density} budget={budget} onBudgetChange={setBudget} />
            <DhaakonProvider theme="light" disableToasts>
              <ScopePanel scope="nested" theme="light" locale={locale} density={density} budget={budget} onBudgetChange={setBudget} />
            </DhaakonProvider>
          </div>
        </DhaakonProvider>
        <p className="doc-p" style={{ marginTop: '1rem' }}>
          Open either inspector with Enter or Space. Tab through it, then press Escape. Its theme
          and direction should follow its originating scope, and focus should return to the exact trigger.
        </p>
      </section>

      <section aria-labelledby="a11y-state-heading">
        <h2 id="a11y-state-heading" className="doc-h2">02 / States with an observable outcome</h2>
        <div style={grid}>
          <div style={panel}>
            <MultiSelect
              label="Research collections"
              description="Controlled multiple selection. Search, select, then inspect the keys below."
              options={[
                { id: 'vector', label: 'Vector studies' },
                { id: 'render', label: 'Offline rendering' },
                { id: 'network', label: 'Network instruments' },
              ]}
              value={collections}
              onChange={setCollections}
            />
            <output aria-label="Selected collection keys" className="dhk-mono" style={{ fontSize: '.75rem', overflowWrap: 'anywhere' }}>
              {collections.join(', ') || 'No collections selected'}
            </output>
            <MultiSelect
              label="Unavailable destinations"
              description="Disabled in this local demonstration. No remote deployment is available."
              options={[{ id: 'production', label: 'Production infrastructure' }]}
              defaultValue={['production']}
              isDisabled
            />
          </div>
          <form
            style={panel}
            aria-label="Local artifact validation"
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              setValidation(invalid ? 'Draft not accepted. Enter an artifact name.' : `Local draft accepted: ${artifact.trim()}. Nothing was uploaded.`);
            }}
          >
            <Field label="Required artifact name" required error={invalid ? 'An artifact name is required.' : undefined} hint="This draft stays in the page; validation performs no network request.">
              <Input value={artifact} onChange={(event) => setArtifact(event.target.value)} name="artifact" placeholder="study-0042.json" />
            </Field>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.75rem' }}>
              <Button type="submit">Validate artifact</Button>
              <Button disabled variant="outline">Upload unavailable</Button>
            </div>
            <p role="status" style={{ margin: 0, fontSize: '.8125rem', color: 'var(--dhk-text-muted)', overflowWrap: 'anywhere' }}>{validation}</p>
          </form>
        </div>
      </section>

      <section aria-labelledby="a11y-contract-heading">
        <h2 id="a11y-contract-heading" className="doc-h2">03 / Contracts to verify</h2>
        <div style={grid}>
          <article style={panel}>
            <h3 className="dhk-eyebrow" style={{ margin: 0 }}>Keyboard and state</h3>
            <p className="doc-p" style={{ margin: 0 }}>
              Use Tab to enter controls and a visible focus ring to locate them. Collections have
              their own arrow-key behavior. MultiSelect keeps multiple choices; Escape clears a
              nonempty search before closing. Disabled items do not activate. A controlled value
              changes only through its owner; native form reset restores uncontrolled defaults.
            </p>
            <a href="https://www.w3.org/WAI/ARIA/apg/">WAI interaction patterns ↗</a>
          </article>
          <article style={panel}>
            <h3 className="dhk-eyebrow" style={{ margin: 0 }}>Meaning beyond appearance</h3>
            <p className="doc-p" style={{ margin: 0 }}>
              Labels must name controls, and errors must describe them. Text, not color alone,
              explains status. The telemetry chart keeps a semantic data table; clipboard failures
              and paused logs remain explicit. Semantic tokens target readable text, including the
              4.5:1 minimum for ordinary text. Custom colors and compositions need their own checks.
            </p>
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html">Understanding text contrast ↗</a>
          </article>
          <article style={panel}>
            <h3 className="dhk-eyebrow" style={{ margin: 0 }}>Motion without dependence</h3>
            <p className="doc-p" style={{ margin: 0 }}>
              Enable reduced motion in your operating system or browser emulation. Drawer entry
              and exit movement should disappear without losing content, dismissal or focus return.
              Research controls must still reach the same outcomes. Review custom animations separately.
            </p>
            <a href="https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html">Understanding interaction animation ↗</a>
          </article>
        </div>
      </section>

      <section aria-labelledby="a11y-evidence-heading">
        <h2 id="a11y-evidence-heading" className="doc-h2">04 / Reproducible quality, explicit scope</h2>
        <p className="doc-p">
          The repository includes interaction tests for fields, menus, tabs, trees, dialogs, verification
          input and the new research surfaces. Browser checks cover the rendered docs rather than
          treating a successful build as interaction evidence. Run the gates on the exact revision
          you intend to adopt:
        </p>
        <CodeSnippet title="Verification commands" language="shell" showLineNumbers={false} code={'npm run check\nnpm --prefix docs run build\nnpm --prefix docs run check:routes\nnpm run build-storybook'} />
        <p className="doc-p" style={{ marginTop: '1.25rem' }}>
          Before using a critical workflow, review zoom and reflow, forced colors, touch interaction,
          keyboard-only operation and representative screen-reader/browser combinations. Current
          automated evidence is not a universal WCAG conformance statement or assistive-technology certification.
        </p>
        <p className="doc-p">
          This release does not claim a virtualized spreadsheet, rich-text editor, backend monitoring
          or complete Untitled UI parity. <Link to="/workbench">The research workbench</Link> demonstrates
          local fixtures; <Link to="/editorial">the editorial system</Link> carries the original identity.
          React Aria supplies interaction foundations, not an exemption from checking the assembled experience.
        </p>
        <a href="https://react-aria.adobe.com/">React Aria foundations ↗</a>
      </section>
    </>
  );
}
