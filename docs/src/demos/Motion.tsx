import { Motion } from '@dhaakon/motion/react';

/** Render-prop animation — here driving SVG attributes, not CSS. */
export default function Demo() {
  return (
    <Motion
      from={{ dash: 0, r: 2 }}
      to={{ dash: 300, r: 7 }}
      duration={1800}
      easing="easeInOutCubic"
      repeat={Infinity}
      direction="alternate"
    >
      {({ dash, r }: { dash: number; r: number }) => (
        <svg viewBox="0 0 300 90" width="100%" height="90" aria-hidden>
          <polyline
            points="4,70 60,44 116,58 172,20 228,36 292,12"
            fill="none"
            stroke="var(--dhk-accent)"
            strokeWidth="2"
            strokeDasharray="300"
            strokeDashoffset={300 - dash}
          />
          <circle cx="292" cy="12" r={r} fill="var(--dhk-ink)" />
        </svg>
      )}
    </Motion>
  );
}
