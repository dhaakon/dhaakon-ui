import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface ErrorPageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Status or short code — "404", "Error 500". */
  code?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** A `<FeaturedIcon>` above the code. */
  icon?: ReactNode;
  actions?: ReactNode;
  /** Technical detail worth copying into a bug report. */
  detail?: ReactNode;
}

/**
 * A full-page failure state.
 *
 * Say what happened in words, not just a number, and give at least one way
 * out. `detail` is for the request id or stack line worth pasting into an
 * issue — useful to the one reader in twenty who will.
 */
export function ErrorPage({
  code,
  title,
  description,
  icon,
  actions,
  detail,
  className,
  ...rest
}: ErrorPageProps) {
  return (
    <div className={cn('dhk-errorpage', className)} {...rest}>
      <div className="dhk-errorpage__inner">
        {icon}
        {code != null && <span className="dhk-errorpage__code">{code}</span>}
        <h1 className="dhk-errorpage__title">{title}</h1>
        {description != null && <p className="dhk-errorpage__desc">{description}</p>}
        {actions != null && (
          <div style={{ display: 'flex', gap: 'var(--dhk-space-3)', flexWrap: 'wrap', justifyContent: 'center' }}>
            {actions}
          </div>
        )}
        {detail != null && (
          <pre
            className="dhk-mono"
            style={{
              marginTop: 'var(--dhk-space-4)',
              padding: 'var(--dhk-space-3)',
              border: '1px solid var(--dhk-border)',
              color: 'var(--dhk-text-subtle)',
              fontSize: 'var(--dhk-text-2xs)',
              textAlign: 'start',
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            {detail}
          </pre>
        )}
      </div>
    </div>
  );
}
