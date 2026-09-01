import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  /** Sits beside the title — a status badge, a version chip. */
  badge?: ReactNode;
  description?: ReactNode;
  /** A `<Breadcrumbs>` above the title. */
  breadcrumbs?: ReactNode;
  /** Primary and secondary buttons, right-aligned. */
  actions?: ReactNode;
  /** A `<Tabs>` list below — the header and tabs read as one block. */
  tabs?: ReactNode;
  /** Drop the bottom rule, for when the content below draws its own. */
  flush?: boolean;
}

/**
 * The top of a screen: breadcrumbs, title, description, actions, and
 * optionally the page's tab strip.
 *
 * Keep `actions` to one primary and one or two secondary. A header with five
 * buttons is a menu wearing a disguise.
 */
export function PageHeader({
  title,
  badge,
  description,
  breadcrumbs,
  actions,
  tabs,
  flush,
  className,
  children,
  ...rest
}: PageHeaderProps) {
  return (
    <header className={cn('dhk-pageheader', flush && 'dhk-pageheader--flush', className)} {...rest}>
      {breadcrumbs}
      <div className="dhk-pageheader__row">
        <div style={{ minWidth: 0 }}>
          <h1 className="dhk-pageheader__title">
            {title}
            {badge}
          </h1>
          {description != null && <p className="dhk-pageheader__desc">{description}</p>}
        </div>
        {actions != null && <div className="dhk-pageheader__actions">{actions}</div>}
      </div>
      {children}
      {tabs}
    </header>
  );
}

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  /** Heading level — match the surrounding document outline. */
  level?: 2 | 3 | 4;
}

/** A smaller ruled heading for a block within a page. */
export function SectionHeader({
  title,
  description,
  actions,
  level = 2,
  className,
  ...rest
}: SectionHeaderProps) {
  const H = `h${level}` as 'h2';
  return (
    <div className={cn('dhk-sectionheader', className)} {...rest}>
      <div>
        <H className="dhk-sectionheader__title">{title}</H>
        {description != null && <p className="dhk-sectionheader__desc">{description}</p>}
      </div>
      {actions}
    </div>
  );
}
