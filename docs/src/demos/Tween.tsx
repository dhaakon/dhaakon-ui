import { useEffect, useRef, useState } from 'react';
import { Tween, Easing } from '@dhaakon/motion';
import { Button, ButtonGroup } from '@dhaakon/ui';

export default function Demo() {
  const box = useRef<HTMLDivElement>(null);
  const tween = useRef<Tween<{ x: number; opacity: number }> | null>(null);
  const [state, setState] = useState('idle');

  useEffect(() => {
    const t = new Tween({
      from: { x: 0, opacity: 0.35 },
      to: { x: 220, opacity: 1 },
      duration: 900,
      easing: Easing.dhaakon,
      repeat: Infinity,
      direction: 'alternate',
      autoplay: false,
      onUpdate: ({ x, opacity }) => {
        if (box.current) {
          box.current.style.transform = `translateX(${x}px)`;
          box.current.style.opacity = String(opacity);
        }
      },
    });
    tween.current = t;
    // A tween keeps running after unmount unless it is cancelled.
    return () => void t.cancel();
  }, []);

  const act = (fn: 'play' | 'pause' | 'reverse') => {
    tween.current?.[fn]();
    setState(fn === 'pause' ? 'paused' : fn === 'reverse' ? 'reversed' : 'running');
  };

  return (
    <div style={{ display: 'grid', gap: '1.25rem' }}>
      <div style={{ height: 48, display: 'flex', alignItems: 'center' }}>
        <div
          ref={box}
          style={{ width: 40, height: 40, background: 'var(--dhk-ink)', opacity: 0.35 }}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
        <ButtonGroup>
          <Button variant="outline" size="sm" onClick={() => act('play')}>Play</Button>
          <Button variant="outline" size="sm" onClick={() => act('pause')}>Pause</Button>
          <Button variant="outline" size="sm" onClick={() => act('reverse')}>Reverse</Button>
          <Button variant="outline" size="sm" onClick={() => tween.current?.seek(0.5)}>Seek 50%</Button>
        </ButtonGroup>
        <span className="dhk-mono" style={{ fontSize: 'var(--dhk-text-xs)', color: 'var(--dhk-text-subtle)' }}>
          {state}
        </span>
      </div>
    </div>
  );
}
