import { color, fontSize, space, motion } from '@dhaakon/ui/tokens';
import { CodeBlock } from '../parts/CodeBlock';

const RAW: [string, string][] = [
  ['paper', color.paper], ['paper-bright', color.paperBright],
  ['ink', color.ink], ['ink-soft', color.inkSoft],
  ['orange', color.orange], ['blue', color.blue],
  ['violet', color.violet], ['acid', color.acid],
];

const SEMANTIC = [
  'bg', 'surface', 'surface-raised', 'surface-inset',
  'text', 'text-muted', 'text-subtle',
  'border', 'border-strong', 'accent', 'focus',
  'success', 'warning', 'danger',
];

function Swatch({ name, value, varName }: { name: string; value: string; varName: string }) {
  return (
    <div className="doc-swatch">
      <div className="doc-swatch__chip" style={{ background: value }} />
      <div className="doc-swatch__meta">
        <b>{name}</b>
        <code>{varName}</code>
      </div>
    </div>
  );
}

export function Foundations() {
  return (
    <>
      <h1 className="doc-h1">Foundations</h1>
      <p className="doc-lede">
        Every value below is a CSS custom property prefixed <code className="doc-inline">--dhk-</code>.
        Those properties are the runtime source of truth; <code className="doc-inline">@dhaakon/ui/tokens</code>{' '}
        mirrors them as data for charts, canvas and email.
      </p>

      <h2 className="doc-h2">Palette</h2>
      <p className="doc-p">
        Taken from dhaakon.com. Warm paper ground, near-black ink, one decisive accent — orange —
        with blue reserved for focus rings and informational state.
      </p>
      <div className="doc-swatches">
        {RAW.map(([n, v]) => <Swatch key={n} name={n} value={v} varName={`--dhk-${n}`} />)}
      </div>

      <h2 className="doc-h2">Semantic tokens</h2>
      <p className="doc-p">These resolve per theme — the same name yields a different value in dark.</p>
      <div className="doc-swatches">
        {SEMANTIC.map((t) => (
          <Swatch key={t} name={t} value={`var(--dhk-${t})`} varName={`--dhk-${t}`} />
        ))}
      </div>

      <h2 className="doc-h2">Typography</h2>
      <div style={{ marginBottom: '2rem' }}>
        {([
          ['IBM Plex Sans', 'var(--dhk-font-sans)', 'Make AI a craft your team owns'],
          ['IBM Plex Serif', 'var(--dhk-font-serif)', 'Experience is part of the method'],
          ['IBM Plex Mono', 'var(--dhk-font-mono)', 'i-60b786b1ac524aa6b · 100.98.68.76'],
          ['Plex Condensed', 'var(--dhk-font-condensed)', 'CONTAINER SERVICE · APP RUNNER'],
        ] as const).map(([name, family, sample]) => (
          <div className="doc-typerow" key={name}>
            <code>{name}</code>
            <span style={{ fontFamily: family, fontSize: '1.1rem' }}>{sample}</span>
          </div>
        ))}
      </div>

      <h3 className="dhk-eyebrow">Scale</h3>
      <div>
        {Object.entries(fontSize).map(([k, v]) => (
          <div className="doc-typerow" key={k}>
            <code>--dhk-text-{k}</code>
            <span style={{ fontSize: v, lineHeight: 1.2 }}>Aa — the quick brown fox</span>
          </div>
        ))}
      </div>

      <h2 className="doc-h2">Spacing</h2>
      <div style={{ display: 'grid', gap: '0.5rem', marginBottom: '2rem' }}>
        {Object.entries(space).map(([k, v]) => (
          <div key={k} style={{ display: 'grid', gridTemplateColumns: '8rem 4rem 1fr', gap: '1rem', alignItems: 'center' }}>
            <code style={{ fontFamily: 'var(--dhk-font-mono)', fontSize: '0.72rem' }}>--dhk-space-{k}</code>
            <code style={{ fontFamily: 'var(--dhk-font-mono)', fontSize: '0.72rem', color: 'var(--dhk-text-subtle)' }}>{v}</code>
            <span style={{ height: 12, width: v, background: 'var(--dhk-accent)' }} />
          </div>
        ))}
      </div>

      <h2 className="doc-h2">Shape</h2>
      <p className="doc-p">
        <code className="doc-inline">--dhk-radius</code> is <code className="doc-inline">0</code>. Sharp
        corners are the loudest thing the system says; the only curve is{' '}
        <code className="doc-inline">--dhk-radius-full</code>, used where a control is genuinely round —
        radio, avatar, spinner, slider thumb.
      </p>

      <h2 className="doc-h2">Motion</h2>
      <p className="doc-p">
        One easing curve, three durations. Everything honours{' '}
        <code className="doc-inline">prefers-reduced-motion</code>.
      </p>
      <CodeBlock
        standalone
        code={`--dhk-ease:           ${motion.ease}
--dhk-duration-fast:  ${motion.durationFast}
--dhk-duration:       ${motion.duration}
--dhk-duration-slow:  ${motion.durationSlow}`}
      />

      <h2 className="doc-h2">Using tokens in code</h2>
      <CodeBlock
        standalone
        code={`import { tokens } from '@dhaakon/ui';

tokens.color.accent;  // '#ff5a1f'
tokens.motion.ease;   // 'cubic-bezier(0.16, 1, 0.3, 1)'
tokens.space[5];      // '1.5rem'`}
      />
    </>
  );
}
