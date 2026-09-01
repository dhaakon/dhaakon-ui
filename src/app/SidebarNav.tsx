import { Fragment, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface SidebarNavItem {
  label: ReactNode;
  href?: string;
  onSelect?: () => void;
  icon?: ReactNode;
  /** Trailing count — open issues, running containers. */
  count?: ReactNode;
  current?: boolean;
}

export interface SidebarNavGroup {
  label?: ReactNode;
  items: SidebarNavItem[];
}

export interface SidebarNavProps extends HTMLAttributes<HTMLElement> {
  groups: SidebarNavGroup[];
  /** Names the landmark. Required when the page has more than one nav. */
  label?: string;
}

/**
 * Grouped sidebar navigation with active state and trailing counts.
 *
 * Items render as links when given an `href` and as buttons otherwise —
 * a nav item that only runs JavaScript is not a link, and pretending
 * otherwise breaks middle-click and "open in new tab".
 */
export function SidebarNav({ groups, label = 'Sections', className, ...rest }: SidebarNavProps) {
  return (
    <nav className={cn('dhk-sidenav', className)} aria-label={label} {...rest}>
      {groups.map((g, gi) => (
        <Fragment key={gi}>
          {g.label != null && <div className="dhk-sidenav__group">{g.label}</div>}
          {g.items.map((it, i) => {
            const inner = (
              <>
                {it.icon != null && <span className="dhk-sidenav__icon" aria-hidden>{it.icon}</span>}
                <span>{it.label}</span>
                {it.count != null && <span className="dhk-sidenav__count">{it.count}</span>}
              </>
            );
            return it.href != null ? (
              <a
                key={i}
                href={it.href}
                className="dhk-sidenav__item"
                aria-current={it.current ? 'page' : undefined}
                onClick={it.onSelect}
              >
                {inner}
              </a>
            ) : (
              <button
                key={i}
                type="button"
                className="dhk-sidenav__item"
                aria-current={it.current ? 'page' : undefined}
                onClick={it.onSelect}
              >
                {inner}
              </button>
            );
          })}
        </Fragment>
      ))}
    </nav>
  );
}
