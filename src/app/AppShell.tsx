import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  /** Usually a `<HeaderNav>`. Rendered above the shell, sticky. */
  header?: ReactNode;
  /** Usually a `<SidebarNav>`. Omit for a full-width page. */
  sidebar?: ReactNode;
  /** Sidebar width. Default `15rem`. */
  sidebarWidth?: string;
  children: ReactNode;
}

/**
 * The frame every application screen sits in: sticky header, optional sticky
 * sidebar, scrolling main column.
 *
 * The sidebar collapses above the main column under 860px rather than turning
 * into a drawer — a drawer needs a trigger and a focus trap, which belongs to
 * the app, not the shell.
 */
export function AppShell({
  header,
  sidebar,
  sidebarWidth = '15rem',
  className,
  children,
  ...rest
}: AppShellProps) {
  return (
    <>
      {header}
      <div
        className={cn('dhk-shell', !sidebar && 'dhk-shell--no-side', className)}
        style={{ ['--_side' as string]: sidebarWidth }}
        {...rest}
      >
        {sidebar}
        <main className="dhk-shell__main">{children}</main>
      </div>
    </>
  );
}
