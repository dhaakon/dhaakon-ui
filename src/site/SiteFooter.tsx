import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface SiteFooterProps extends HTMLAttributes<HTMLElement> {
  email: string;
  /** e.g. "© 2026 David Poyner". */
  copyright?: ReactNode;
  /** Extra right-hand items (nav links, social). */
  items?: ReactNode[];
}

export function SiteFooter({ email, copyright, items = [], className, ...rest }: SiteFooterProps) {
  return (
    <footer className={cn('dhk-sitefooter', className)} {...rest}>
      <a className="dhk-sitefooter__email" href={`mailto:${email}`}>
        {email}
      </a>
      <span style={{ display: 'flex', gap: 'var(--dhk-space-5)', flexWrap: 'wrap' }}>
        {items.map((it, i) => (
          <span key={i}>{it}</span>
        ))}
        {copyright != null && <span>{copyright}</span>}
      </span>
    </footer>
  );
}
