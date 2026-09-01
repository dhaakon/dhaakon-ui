import { type HTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: 'sm' | 'md' | 'lg';
  accent?: boolean;
  /** Announced to screen readers. Set `null` when a nearby label already says it. */
  label?: string | null;
}

/** Indeterminate activity. Prefer `Progress` whenever you know the percentage. */
export function Spinner({ size = 'md', accent, label = 'Loading', className, ...rest }: SpinnerProps) {
  return (
    <span
      role={label ? 'status' : undefined}
      aria-label={label ?? undefined}
      className={cn(
        'dhk-spinner',
        size !== 'md' && `dhk-spinner--${size}`,
        accent && 'dhk-spinner--accent',
        className,
      )}
      {...rest}
    />
  );
}

export interface SkeletonProps extends HTMLAttributes<HTMLSpanElement> {
  /** Text-line proportions with vertical rhythm. */
  text?: boolean;
  circle?: boolean;
  width?: string | number;
  height?: string | number;
  /** Render N stacked lines. Only with `text`. */
  lines?: number;
}

/**
 * A loading placeholder. Always hidden from screen readers — pair the region
 * with `aria-busy` so assistive tech hears one "loading", not twenty.
 */
export function Skeleton({
  text,
  circle,
  width,
  height,
  lines = 1,
  className,
  style,
  ...rest
}: SkeletonProps) {
  if (text && lines > 1) {
    return (
      <span aria-hidden style={{ display: 'block' }}>
        {Array.from({ length: lines }, (_, i) => (
          <span
            key={i}
            className={cn('dhk-skeleton', 'dhk-skeleton--text', className)}
            // Ragged last line reads as a paragraph, not a block.
            style={{ width: i === lines - 1 ? '65%' : width ?? '100%', height, ...style }}
          />
        ))}
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        'dhk-skeleton',
        text && 'dhk-skeleton--text',
        circle && 'dhk-skeleton--circle',
        className,
      )}
      style={{ width, height, ...style }}
      {...rest}
    />
  );
}
