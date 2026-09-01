import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { CtaLink } from './CtaLink';

export interface OfferCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  index: ReactNode;
  title: ReactNode;
  /** Small caps line above/below the title — "Capability Program". */
  subtitle?: ReactNode;
  description?: ReactNode;
  /** `+`-prefixed inclusion lines. */
  includes?: ReactNode[];
  cta?: { label: ReactNode; href: string };
}

/** An engagement option — `[ 01 ] Diagnostic & Keynote`, `+` list, CTA. */
export function OfferCard({
  index,
  title,
  subtitle,
  description,
  includes = [],
  cta,
  className,
  ...rest
}: OfferCardProps) {
  return (
    <div className={cn('dhk-offercard', className)} {...rest}>
      <div className="dhk-sectionmarker">
        <span className="dhk-sectionmarker__index">{index}</span>
      </div>
      <div className="dhk-offercard__title">{title}</div>
      {subtitle != null && <div className="dhk-offercard__subtitle">{subtitle}</div>}
      {description != null && <p className="dhk-offercard__desc">{description}</p>}
      {includes.length > 0 && (
        <ul className="dhk-offercard__includes">
          {includes.map((it, i) => (
            <li key={i}>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      )}
      {cta && (
        <CtaLink href={cta.href}>{cta.label}</CtaLink>
      )}
    </div>
  );
}
