import { type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';

/** The glyph vocabulary dhaakon.com annotates with. */
export const GLYPHS = {
  'arrow-ne': '↗', // ↗
  'arrow-se': '↘', // ↘
  'arrow-lr': '↔', // ↔
  'arrow-down': '↓', // ↓
  hook: '↳', // ↳
  target: '◎', // ◎
  plus: '+',
  minus: '−', // −
  'not-equal': '≠', // ≠
} as const;

export type GlyphName = keyof typeof GLYPHS;

export interface MarkerProps extends HTMLAttributes<HTMLSpanElement> {
  /** A named glyph, or pass `children` for anything else. */
  glyph?: GlyphName;
  tone?: 'subtle' | 'ink' | 'accent';
}

export function Marker({ glyph, tone = 'subtle', className, children, ...rest }: MarkerProps) {
  return (
    <span
      aria-hidden
      className={cn('dhk-marker', tone !== 'subtle' && `dhk-marker--${tone}`, className)}
      {...rest}
    >
      {glyph ? GLYPHS[glyph] : children}
    </span>
  );
}
