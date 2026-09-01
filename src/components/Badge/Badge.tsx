import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export type BadgeTone = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Filled instead of outlined. */
  solid?: boolean;
  /** Leading status dot. */
  dot?: boolean;
}

export function Badge({ tone = 'neutral', solid, dot, className, children, ...rest }: BadgeProps) {
  return (
    <span
      className={cn('dhk-badge', tone !== 'neutral' && `dhk-badge--${tone}`, solid && 'dhk-badge--solid', className)}
      {...rest}
    >
      {dot && <span className="dhk-badge__dot" aria-hidden />}
      {children}
    </span>
  );
}
