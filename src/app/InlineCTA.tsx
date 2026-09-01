import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface InlineCTAProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** A `<FeaturedIcon>` or similar, before the copy. */
  icon?: ReactNode;
  actions?: ReactNode;
  variant?: 'default' | 'accent' | 'ink';
}

/**
 * A banner promoting the next step — an upgrade, a new feature, an
 * unfinished setup task.
 *
 * Not an `Alert`: an alert reports the state of what is on screen, this asks
 * for something unrelated to it. Keep at most one per page, or they stop
 * being read at all.
 */
export function InlineCTA({
  title,
  description,
  icon,
  actions,
  variant = 'default',
  className,
  ...rest
}: InlineCTAProps) {
  return (
    <div
      className={cn('dhk-inlinecta', variant !== 'default' && `dhk-inlinecta--${variant}`, className)}
      {...rest}
    >
      {icon}
      <div className="dhk-inlinecta__text">
        <div className="dhk-inlinecta__title">{title}</div>
        {description != null && <p className="dhk-inlinecta__desc">{description}</p>}
      </div>
      {actions != null && <div className="dhk-inlinecta__actions">{actions}</div>}
    </div>
  );
}
