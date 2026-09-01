import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. `primary` is solid ink → accent on hover. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to the container width. */
  block?: boolean;
  /** Icon before the label. Pass a 1em-sized element (e.g. a lucide icon). */
  iconStart?: ReactNode;
  /** Icon after the label. */
  iconEnd?: ReactNode;
}

/**
 * The dhaakon button: sharp corners, uppercase Plex Condensed label,
 * one decisive hover state.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', block, iconStart, iconEnd, className, type = 'button', children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        'dhk-btn',
        `dhk-btn--${variant}`,
        size !== 'md' && `dhk-btn--${size}`,
        block && 'dhk-btn--block',
        className,
      )}
      {...rest}
    >
      {iconStart != null && <span className="dhk-btn__icon" aria-hidden>{iconStart}</span>}
      {children}
      {iconEnd != null && <span className="dhk-btn__icon" aria-hidden>{iconEnd}</span>}
    </button>
  );
});
