import { useRef } from 'react';
import { Timeline, Tween, Easing } from '@dhaakon/motion';
import { Button } from '@dhaakon/ui';
import { useTimeline } from '@dhaakon/motion/react';

export default function Demo() {
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  const c = useRef<HTMLDivElement>(null);

  const slide = (el: React.RefObject<HTMLDivElement | null>) =>
    new Tween({
      from: { x: -32, opacity: 0 },
      to: { x: 0, opacity: 1 },
      duration: 420,
      easing: Easing.dhaakon,
      autoplay: false,
      onUpdate: ({ x, opacity }) => {
        if (el.current) {
          el.current.style.transform = `translateX(${x}px)`;
          el.current.style.opacity = String(opacity);
        }
      },
    });

  // useTimeline builds once and cancels on unmount.
  const timeline = useTimeline(
    () =>
      new Timeline({ autoplay: false })
        .label('entrance')
        .add(slide(a), 'entrance')
        .add(slide(b), 'entrance+=90')
        .add(slide(c), 'entrance+=180'),
    [],
  );

  const rows = [a, b, c];
  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <div style={{ display: 'grid', gap: '0.5rem' }}>
        {rows.map((r, i) => (
          <div
            key={i}
            ref={r}
            style={{
              opacity: 0, padding: '0.6rem 0.9rem',
              border: '1px solid var(--dhk-border)', background: 'var(--dhk-surface-raised)',
              fontSize: 'var(--dhk-text-sm)',
            }}
          >
            Row {String(i + 1).padStart(2, '0')}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Button variant="outline" size="sm" onClick={() => { timeline.current?.seek(0); timeline.current?.play(); }}>Play</Button>
        <Button variant="outline" size="sm" onClick={() => timeline.current?.reverse()}>Reverse</Button>
      </div>
    </div>
  );
}
