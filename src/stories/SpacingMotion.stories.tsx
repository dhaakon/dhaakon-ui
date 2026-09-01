import type { Meta, StoryObj } from '@storybook/react-vite';
import { space, motion } from '../tokens';

const meta = {
  title: 'Foundations/Spacing & Motion',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Spacing: Story = {
  render: () => (
    <div>
      <p style={{ color: 'var(--dhk-text-muted)', maxWidth: '42rem' }}>
        A rem-based step. Components use these for padding and gaps; layouts add
        the fluid <code className="dhk-mono">--dhk-gutter</code>.
      </p>
      <div style={{ display: 'grid', gap: '0.5rem', marginTop: '1.5rem' }}>
        {Object.entries(space).map(([k, v]) => (
          <div key={k} style={{ display: 'grid', gridTemplateColumns: '4rem 5rem 1fr', gap: '1rem', alignItems: 'center' }}>
            <span className="dhk-mono" style={{ fontSize: '0.72rem' }}>space-{k}</span>
            <span className="dhk-mono" style={{ fontSize: '0.72rem', color: 'var(--dhk-text-subtle)' }}>{v}</span>
            <span style={{ height: 14, width: v, background: 'var(--dhk-accent)' }} />
          </div>
        ))}
      </div>
    </div>
  ),
};

export const Motion: Story = {
  render: () => (
    <div>
      <p style={{ color: 'var(--dhk-text-muted)', maxWidth: '42rem' }}>
        One easing curve — <code className="dhk-mono">{motion.ease}</code> — and
        three durations. Hover a box.
      </p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        {[
          ['fast', motion.durationFast],
          ['base', motion.duration],
          ['slow', motion.durationSlow],
        ].map(([name, dur]) => (
          <div
            key={name}
            style={{
              width: 120,
              height: 120,
              border: '1px solid var(--dhk-border-strong)',
              display: 'grid',
              placeItems: 'center',
              fontSize: '0.75rem',
              transition: `background-color ${dur} ${motion.ease}, transform ${dur} ${motion.ease}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--dhk-ink)';
              e.currentTarget.style.color = 'var(--dhk-paper)';
              e.currentTarget.style.transform = 'translateY(-6px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '';
              e.currentTarget.style.color = '';
              e.currentTarget.style.transform = '';
            }}
          >
            {name} · {dur}
          </div>
        ))}
      </div>
    </div>
  ),
};
