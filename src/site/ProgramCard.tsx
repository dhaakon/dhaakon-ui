import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface ProgramCardProps extends HTMLAttributes<HTMLDivElement> {
  index: number;
  total: number;
  /** e.g. "8–16 weeks". */
  duration?: ReactNode;
  name: ReactNode;
  description?: ReactNode;
  /** `↳`-prefixed detail lines. */
  points?: ReactNode[];
  /** The "You get" payoff. */
  outcome?: ReactNode;
  outcomeLabel?: ReactNode;
}

/** A program / offering card — `02 / 04 · 8–16 weeks` header, ↳ points, payoff. */
export function ProgramCard({
  index,
  total,
  duration,
  name,
  description,
  points = [],
  outcome,
  outcomeLabel = 'You get',
  className,
  ...rest
}: ProgramCardProps) {
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    <div className={cn('dhk-programcard', className)} {...rest}>
      <div className="dhk-programcard__meta">
        <span className="dhk-programcard__count">
          {pad(index)} / {pad(total)}
        </span>
        {duration != null && <span>{duration}</span>}
      </div>
      <div className="dhk-programcard__name">{name}</div>
      {description != null && <p className="dhk-programcard__desc">{description}</p>}
      {points.length > 0 && (
        <ul className="dhk-programcard__points">
          {points.map((p, i) => (
            <li key={i}>
              <span>{p}</span>
            </li>
          ))}
        </ul>
      )}
      {outcome != null && (
        <div className="dhk-programcard__outcome">
          <b>{outcomeLabel}</b>
          {outcome}
        </div>
      )}
    </div>
  );
}
