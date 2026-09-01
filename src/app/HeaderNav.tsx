import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { LogoMark } from '../components/Logo/Logo';

export interface HeaderNavLink {
  label: ReactNode;
  href: string;
  current?: boolean;
}

export interface HeaderNavProps extends HTMLAttributes<HTMLElement> {
  brand: ReactNode;
  /**
   * Mark before the brand. Defaults to the dhaakon monogram; pass `null` to
   * drop it, or your own element to replace it.
   */
  mark?: ReactNode;
  links?: HeaderNavLink[];
  /** Right-hand slot: search, notifications, an avatar menu. */
  end?: ReactNode;
}

/**
 * The top bar: brand, primary links, and a slot for account controls.
 *
 * `aria-current="page"` marks the active link, so it is announced as the
 * current location rather than merely looking different.
 */
export function HeaderNav({
  brand,
  mark = <LogoMark size={20} />,
  links = [],
  end,
  className,
  ...rest
}: HeaderNavProps) {
  return (
    <header className={cn('dhk-headernav', className)} {...rest}>
      <span className="dhk-headernav__brand">
        {mark != null && <span className="dhk-headernav__mark" aria-hidden>{mark}</span>}
        {brand}
      </span>
      {links.length > 0 && (
        <nav className="dhk-headernav__links" aria-label="Primary">
          {links.map((l, i) => (
            <a key={i} href={l.href} aria-current={l.current ? 'page' : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
      )}
      {end != null && <div className="dhk-headernav__end">{end}</div>}
    </header>
  );
}
