import { type ReactNode } from 'react';
import {
  Breadcrumbs as AriaBreadcrumbs,
  Breadcrumb as AriaBreadcrumb,
  Link as AriaLink,
  type BreadcrumbsProps as AriaBreadcrumbsProps,
  type BreadcrumbProps as AriaBreadcrumbProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';

export interface BreadcrumbsProps<T extends object> extends Omit<AriaBreadcrumbsProps<T>, 'className'> {
  className?: string;
}

/**
 * Trail of ancestor pages. React Aria marks the final crumb `aria-current="page"`
 * and wraps the list in a labelled `<nav>`.
 */
export function Breadcrumbs<T extends object>({ className, ...rest }: BreadcrumbsProps<T>) {
  return <AriaBreadcrumbs {...rest} className={cn('dhk-breadcrumbs', className)} />;
}

export interface BreadcrumbProps extends Omit<AriaBreadcrumbProps, 'className' | 'children'> {
  children?: ReactNode;
  /** Omit on the final crumb — the current page is not a link. */
  href?: string;
  /** Separator glyph shown after this crumb. */
  separator?: string;
  className?: string;
}

export function Breadcrumb({
  children,
  href,
  separator = '/',
  className,
  ...rest
}: BreadcrumbProps) {
  return (
    <AriaBreadcrumb {...rest} className={cn('dhk-breadcrumb', className)}>
      {href != null ? <AriaLink href={href}>{children}</AriaLink> : <span>{children}</span>}
      <span className="dhk-breadcrumb__sep" aria-hidden>
        {separator}
      </span>
    </AriaBreadcrumb>
  );
}
