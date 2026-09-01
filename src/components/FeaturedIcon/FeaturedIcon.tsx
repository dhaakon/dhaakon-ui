import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type FeaturedIconTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

export interface FeaturedIconProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  tone?: FeaturedIconTone;
  /** Filled rather than outlined. */
  solid?: boolean;
  /** Circular rather than square. */
  circle?: boolean;
}

/**
 * An icon in a bordered frame — the lead-in for empty states, alerts and
 * feature rows. Decorative by default; give it a `role`/`aria-label` if it
 * carries meaning on its own.
 */
export function FeaturedIcon({
  children,
  size = 'md',
  tone = 'neutral',
  solid,
  circle,
  className,
  ...rest
}: FeaturedIconProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'dhk-featured-icon',
        `dhk-featured-icon--${size}`,
        tone !== 'neutral' && `dhk-featured-icon--${tone}`,
        solid && 'dhk-featured-icon--solid',
        circle && 'dhk-featured-icon--circle',
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}
