import { type ReactNode } from 'react';
import {
  DialogTrigger,
  Popover as AriaPopover,
  Dialog as AriaDialog,
  type PopoverProps as AriaPopoverProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';

// React Aria's PopoverProps has its own string `trigger`, so it is omitted here.
export interface PopoverProps extends Omit<AriaPopoverProps, 'children' | 'className' | 'trigger'> {
  /** The control that opens it. */
  trigger: ReactNode;
  /** Receives a `close` function for buttons inside the panel. */
  children: ReactNode | ((close: () => void) => ReactNode);
  /** Describes the panel for screen readers. */
  'aria-label'?: string;
  className?: string;
}

/**
 * A non-modal overlay anchored to its trigger — filter panels, detail cards,
 * small forms.
 *
 * React Aria handles collision-aware placement, outside-click and Escape
 * dismissal, and returning focus to the trigger. Unlike `Modal` the page
 * behind stays interactive, so use it for optional detail rather than for
 * work that must be completed.
 */
export function Popover({
  trigger,
  children,
  'aria-label': ariaLabel,
  placement = 'bottom start',
  className,
  ...rest
}: PopoverProps) {
  return (
    <DialogTrigger>
      {trigger}
      <AriaPopover {...rest} placement={placement} className={cn('dhk-popover', className)}>
        <AriaDialog aria-label={ariaLabel} style={{ outline: 'none', padding: 'var(--dhk-space-4)' }}>
          {({ close }) => <>{typeof children === 'function' ? children(close) : children}</>}
        </AriaDialog>
      </AriaPopover>
    </DialogTrigger>
  );
}
