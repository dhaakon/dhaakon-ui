import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  /**
   * Set when the buttons are alternatives to one another (a segmented
   * control) rather than a row of separate actions.
   */
  label?: string;
}

/**
 * Joins buttons into one unit, collapsing the hairline between neighbours.
 *
 * Use `variant="outline"` on the children — a row of solid buttons reads as
 * several primary actions.
 */
export function ButtonGroup({
  children,
  orientation = 'horizontal',
  label,
  className,
  ...rest
}: ButtonGroupProps) {
  return (
    <div
      role="group"
      aria-label={label}
      data-orientation={orientation}
      className={cn('dhk-btngroup', className)}
      {...rest}
    >
      {children}
    </div>
  );
}
