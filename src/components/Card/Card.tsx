import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Lift off the page with a subtle shadow + brighter ground. */
  raised?: boolean;
  /** Border reacts to hover — use when the whole card is a link/button. */
  interactive?: boolean;
  /** Remove body padding (for edge-to-edge tables, media, etc.). */
  flush?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { raised, interactive, flush, className, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        'dhk-card',
        raised && 'dhk-card--raised',
        interactive && 'dhk-card--interactive',
        flush && 'dhk-card--flush',
        className,
      )}
      {...rest}
    />
  );
});

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  subtitle?: ReactNode;
  /** Right-aligned slot — actions, a badge, a menu. */
  action?: ReactNode;
}

export function CardHeader({ title, subtitle, action, className, children, ...rest }: CardHeaderProps) {
  return (
    <div className={cn('dhk-card__header', className)} {...rest}>
      {(title != null || action != null) && (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
          {title != null && <div className="dhk-card__title">{title}</div>}
          {action != null && <div>{action}</div>}
        </div>
      )}
      {subtitle != null && <div className="dhk-card__subtitle">{subtitle}</div>}
      {children}
    </div>
  );
}

export function CardBody({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('dhk-card__body', className)} {...rest} />;
}

export function CardFooter({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('dhk-card__footer', className)} {...rest} />;
}
