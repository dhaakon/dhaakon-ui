import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface Stat {
  label: ReactNode;
  value: ReactNode;
}

export interface StatListProps extends HTMLAttributes<HTMLDListElement> {
  stats: Stat[];
  /** Wrap in a hairline box with inner padding. */
  boxed?: boolean;
}

/**
 * Key/value detail — instance metadata, resource attributes.
 *
 * Renders a real `<dl>`, so the pairing between term and value survives being
 * read out of order by a screen reader. Two columns collapse to stacked pairs
 * under 560px.
 */
export function StatList({ stats, boxed, className, ...rest }: StatListProps) {
  return (
    <dl className={cn('dhk-statlist', boxed && 'dhk-statlist--boxed', className)} {...rest}>
      {stats.map((s, i) => (
        <div className="dhk-statlist__row" key={i}>
          <dt className="dhk-statlist__key">{s.label}</dt>
          <dd className="dhk-statlist__value">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
