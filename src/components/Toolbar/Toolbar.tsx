import {
  Toolbar as AriaToolbar,
  Separator,
  type ToolbarProps as AriaToolbarProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';

export interface ToolbarProps extends Omit<AriaToolbarProps, 'className'> {
  className?: string;
}

/**
 * A row of controls that behaves as one tab stop.
 *
 * Tab moves past the whole toolbar; arrow keys move between the controls
 * inside it. That keeps a dense action bar from swallowing a dozen tab
 * presses, and is what WAI-ARIA expects of one.
 */
export function Toolbar({ className, ...rest }: ToolbarProps) {
  return <AriaToolbar {...rest} className={cn('dhk-toolbar', className)} />;
}

/** A visual divider between groups of toolbar controls. */
export function ToolbarSeparator({ orientation = 'vertical' }: { orientation?: 'horizontal' | 'vertical' }) {
  return <Separator orientation={orientation} className="dhk-toolbar__separator" />;
}
