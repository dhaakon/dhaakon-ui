import { type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface CtaLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  /** Trailing glyph. Default "↗". */
  glyph?: string;
}

/** The underlined uppercase call-to-action — "Let's engage and discuss details ↗". */
export function CtaLink({ children, glyph = '↗', className, ...rest }: CtaLinkProps) {
  return (
    <a className={cn('dhk-cta', className)} {...rest}>
      {children}
      <span className="dhk-cta__glyph" aria-hidden>{glyph}</span>
    </a>
  );
}
