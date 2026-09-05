import { useInView } from '@dhaakon/motion/react';
import { Badge } from '@dhaakon/ui';

export default function Demo() {
  // The escape hatch under Reveal: the entrance drives state, not a style.
  const [ref, inView] = useInView<HTMLDivElement>({ once: false, amount: 0.6 });

  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <div>
        <Badge tone={inView ? 'success' : 'neutral'} dot>
          {inView ? 'in view' : 'out of view'}
        </Badge>
      </div>
      <div tabIndex={0} role="region" aria-label="Scroll to observe element visibility" style={{ height: 220, overflowY: 'auto', border: '1px solid var(--dhk-border)', padding: '1rem' }}>
        <div style={{ height: 180 }} />
        <div
          ref={ref}
          style={{
            padding: '2rem', textAlign: 'center',
            border: '1px dashed var(--dhk-border-strong)',
            background: inView ? 'var(--dhk-surface-raised)' : 'transparent',
            transition: 'background-color var(--dhk-duration) var(--dhk-ease)',
          }}
        >
          Observed element
        </div>
        <div style={{ height: 180 }} />
      </div>
    </div>
  );
}
