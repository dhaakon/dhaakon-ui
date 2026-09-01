import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface CapabilityIndexProps extends HTMLAttributes<HTMLDivElement> {
  /** Heading — "08 capabilities", "Working fluency". */
  heading?: ReactNode;
  items: ReactNode[];
}

/** The numbered capability grid — `08 capabilities` → `01 …` cells. */
export function CapabilityIndex({ heading, items, className, ...rest }: CapabilityIndexProps) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className={cn('dhk-capindex', className)} {...rest}>
      {heading != null && <span className="dhk-capindex__count">{heading}</span>}
      <div className="dhk-capindex__grid">
        {items.map((it, i) => (
          <div className="dhk-capindex__cell" key={i}>
            <span className="dhk-capindex__cell-index">{pad(i + 1)}</span>
            <span>{it}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
