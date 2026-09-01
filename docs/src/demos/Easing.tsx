import { Easing, cubicBezier, spring } from '@dhaakon/motion';

const CURVES: [string, (t: number) => number][] = [
  ['linear', Easing.linear],
  ['easeOutCubic', Easing.easeOutCubic],
  ['easeInOutQuart', Easing.easeInOutQuart],
  ['easeOutBack', Easing.easeOutBack],
  ['dhaakon', Easing.dhaakon],
  ['cubicBezier(.4,0,.2,1)', cubicBezier(0.4, 0, 0.2, 1)],
  ['spring({ stiffness: 210 })', spring({ stiffness: 210, damping: 20 })],
];

/** Plot a curve over its unit square; y is inverted because SVG grows downward. */
function Plot({ fn }: { fn: (t: number) => number }) {
  const pts = Array.from({ length: 41 }, (_, i) => {
    const t = i / 40;
    return `${t * 100},${100 - fn(t) * 100}`;
  }).join(' ');
  return (
    <svg viewBox="-6 -22 112 144" width="88" height="88" aria-hidden>
      <rect x="0" y="0" width="100" height="100" fill="var(--dhk-surface-inset)" />
      <polyline points={pts} fill="none" stroke="var(--dhk-accent)" strokeWidth="2"
        vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fill, minmax(9rem, 1fr))' }}>
      {CURVES.map(([name, fn]) => (
        <figure key={name} style={{ margin: 0, display: 'grid', gap: '0.5rem', justifyItems: 'center' }}>
          <Plot fn={fn} />
          <figcaption className="dhk-mono" style={{ fontSize: '0.68rem', color: 'var(--dhk-text-subtle)', textAlign: 'center' }}>
            {name}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
