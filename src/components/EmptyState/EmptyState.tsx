import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Usually a `<FeaturedIcon>`. */
  icon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** The way out — creating the first item, clearing a filter. */
  actions?: ReactNode;
}

/**
 * The "nothing here" panel. Say why it is empty and give one clear action;
 * an empty list with no next step is a dead end.
 */
export function EmptyState({
  icon,
  title,
  description,
  actions,
  className,
  children,
  ...rest
}: EmptyStateProps) {
  return (
    <div className={cn('dhk-empty', className)} {...rest}>
      {icon}
      <div>
        <div className="dhk-empty__title">{title}</div>
        {description != null && <p className="dhk-empty__desc">{description}</p>}
      </div>
      {children}
      {actions != null && <div className="dhk-empty__actions">{actions}</div>}
    </div>
  );
}
