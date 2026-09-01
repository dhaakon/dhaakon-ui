import { useEffect, useRef } from 'react';
import { Tween, Easing } from '@dhaakon/motion';
import { useMotionValue, useMotionValueState } from '@dhaakon/motion/react';

export default function Demo() {
  // Widen off the literal `0`, or T infers as the type `0`.
  const value = useMotionValue<number>(0);
  // Reading it as state rerenders; the bar below is written to directly.
  const shown = useMotionValueState(value);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // subscribe() takes no argument — pull the current value instead.
    const unsubscribe = value.subscribe(() => {
      if (bar.current) bar.current.style.width = `${value.get()}%`;
    });
    const tween = new Tween({
      from: 0, to: 100, duration: 2400, easing: Easing.easeInOutCubic,
      repeat: Infinity, direction: 'alternate',
      onUpdate: (v) => value.set(v),
    });
    return () => { tween.cancel(); unsubscribe(); };
  }, [value]);

  return (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 420 }}>
      <div style={{ height: 8, border: '1px solid var(--dhk-border)', background: 'var(--dhk-surface-inset)' }}>
        <div ref={bar} style={{ height: '100%', width: 0, background: 'var(--dhk-accent)' }} />
      </div>
      <span className="dhk-mono" style={{ fontSize: 'var(--dhk-text-xs)', color: 'var(--dhk-text-subtle)' }}>
        {shown.toFixed(1)}%
      </span>
    </div>
  );
}
