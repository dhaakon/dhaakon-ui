import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { color } from '../tokens';

const meta = {
  title: 'Foundations/Colour',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

function Swatch({ name, value, cssVar }: { name: string; value: string; cssVar?: string }) {
  return (
    <div style={{ border: '1px solid var(--dhk-border)' }}>
      <div style={{ height: 72, background: value }} />
      <div style={{ padding: '0.5rem 0.75rem', borderTop: '1px solid var(--dhk-border)' }}>
        <div style={{ fontSize: '0.8rem' }}>{name}</div>
        <div className="dhk-mono" style={{ color: 'var(--dhk-text-subtle)', fontSize: '0.7rem' }}>
          {cssVar ?? value}
        </div>
      </div>
    </div>
  );
}

const grid: CSSProperties = {
  display: 'grid',
  gap: '0.75rem',
  gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
  marginBottom: '2rem',
};

export const Palette: Story = {
  render: () => (
    <div>
      <div className="dhk-eyebrow" style={{ marginBottom: '0.75rem' }}>Ground &amp; ink</div>
      <div style={grid}>
        <Swatch name="paper" value={color.paper} cssVar="--dhk-paper" />
        <Swatch name="paper-bright" value={color.paperBright} cssVar="--dhk-paper-bright" />
        <Swatch name="ink" value={color.ink} cssVar="--dhk-ink" />
        <Swatch name="ink-soft" value={color.inkSoft} cssVar="--dhk-ink-soft" />
      </div>

      <div className="dhk-eyebrow" style={{ marginBottom: '0.75rem' }}>Accents</div>
      <div style={grid}>
        <Swatch name="orange (accent)" value={color.orange} cssVar="--dhk-orange" />
        <Swatch name="blue (focus / info)" value={color.blue} cssVar="--dhk-blue" />
        <Swatch name="violet" value={color.violet} cssVar="--dhk-violet" />
        <Swatch name="acid" value={color.acid} cssVar="--dhk-acid" />
      </div>

      <div className="dhk-eyebrow" style={{ marginBottom: '0.75rem' }}>Semantic (resolve per theme)</div>
      <div style={grid}>
        {['bg', 'surface', 'surface-raised', 'text', 'text-muted', 'text-subtle', 'border', 'accent', 'focus', 'success', 'warning', 'danger'].map(
          (t) => (
            <Swatch key={t} name={t} value={`var(--dhk-${t})`} cssVar={`--dhk-${t}`} />
          ),
        )}
      </div>
    </div>
  ),
};
