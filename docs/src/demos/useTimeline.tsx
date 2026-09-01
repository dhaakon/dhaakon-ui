import { useRef } from 'react';
import { Timeline, Tween } from '@dhaakon/motion';
import { useTimeline } from '@dhaakon/motion/react';
import { Button } from '@dhaakon/ui';

export default function Demo() {
  const bars = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];

  const grow = (el: React.RefObject<HTMLDivElement | null>, to: number) =>
    new Tween({
      from: 0, to, duration: 520, easing: 'dhaakon', autoplay: false,
      onUpdate: (w) => { if (el.current) el.current.style.width = `${w}%`; },
    });

  // Built once, cancelled on unmount — the bookkeeping that otherwise leaks
  // running tweens on every rerender.
  const timeline = useTimeline(
    () => new Timeline({ autoplay: false })
      .add(grow(bars[0], 82))
      .add(grow(bars[1], 54), '<+=120')
      .add(grow(bars[2], 31), '<+=120'),
    [],
  );

  return (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: 420 }}>
      {bars.map((b, i) => (
        <div key={i} style={{ height: 10, border: '1px solid var(--dhk-border)', background: 'var(--dhk-surface-inset)' }}>
          <div ref={b} style={{ height: '100%', width: 0, background: 'var(--dhk-ink)' }} />
        </div>
      ))}
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <Button variant="outline" size="sm" onClick={() => { timeline.current?.seek(0); timeline.current?.play(); }}>Play</Button>
        <Button variant="outline" size="sm" onClick={() => timeline.current?.reverse()}>Reverse</Button>
      </div>
    </div>
  );
}
