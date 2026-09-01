import { type ReactNode } from 'react';
import {
  TooltipTrigger,
  Tooltip as AriaTooltip,
  OverlayArrow,
  type TooltipProps as AriaTooltipProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';

export interface TooltipProps extends Omit<AriaTooltipProps, 'children' | 'className'> {
  /** The element the tooltip describes. Must be focusable to be reachable. */
  children: ReactNode;
  /** Tooltip body. Keep it short — it is not focusable, so no links inside. */
  content: ReactNode;
  /** ms before it opens on hover. Default 700 for the first, instant after. */
  delay?: number;
  arrow?: boolean;
  className?: string;
}

/**
 * Hover/focus hint. React Aria handles the warmup delay, touch suppression,
 * and `aria-describedby` wiring.
 *
 * Never put essential information or interactive content here — tooltips are
 * unreachable by touch and vanish on blur.
 */
export function Tooltip({
  children,
  content,
  delay = 700,
  placement = 'top',
  arrow = true,
  className,
  ...rest
}: TooltipProps) {
  return (
    <TooltipTrigger delay={delay}>
      {children}
      <AriaTooltip {...rest} placement={placement} className={cn('dhk-tooltip', className)}>
        {arrow && (
          <OverlayArrow className="dhk-tooltip__arrow">
            <svg width={8} height={8} viewBox="0 0 8 8" aria-hidden>
              <path d="M0 0 L4 4 L8 0 Z" />
            </svg>
          </OverlayArrow>
        )}
        {content}
      </AriaTooltip>
    </TooltipTrigger>
  );
}
