import { Fragment, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface StatusBarProps extends HTMLAttributes<HTMLDivElement> {
  /** The lead word — e.g. "Listening", "Available", "Booked". */
  status: ReactNode;
  /** Pulsing dot next to the status. Default true. */
  pulse?: boolean;
  /** Right-hand facts — location, coverage, timezone. */
  items?: ReactNode[];
}

/** The thin availability strip at the very top of dhaakon.com. */
export function StatusBar({ status, pulse = true, items = [], className, ...rest }: StatusBarProps) {
  return (
    <div className={cn('dhk-statusbar', className)} {...rest}>
      <span className="dhk-statusbar__status">
        {pulse && <span className="dhk-statusbar__pulse" aria-hidden />}
        {status}
      </span>
      {items.map((it, i) => (
        <Fragment key={i}>
          <span className="dhk-statusbar__sep" aria-hidden>/</span>
          <span>{it}</span>
        </Fragment>
      ))}
    </div>
  );
}
