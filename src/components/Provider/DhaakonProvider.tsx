import { type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ToastProvider } from '../Toast/Toast';

export interface DhaakonProviderProps {
  children: ReactNode;
  /**
   * Force a theme. Omit to follow the `data-theme` attribute on `<html>`
   * (or the OS setting when that is absent).
   */
  theme?: 'light' | 'dark';
  /** Render as a different element. Default `div`. */
  as?: 'div' | 'main' | 'body';
  className?: string;
  /** Skip mounting the toast portal (if you mount `<ToastProvider>` yourself). */
  disableToasts?: boolean;
}

/**
 * Root wrapper for any dhaakon-network app. Establishes the `.dhk-root`
 * baseline (Plex, paper ground, box-sizing), an optional theme scope, and
 * the toast host. Requires `import '@dhaakon/ui/styles.css'` once at the
 * app entry.
 */
export function DhaakonProvider({
  children,
  theme,
  as: Tag = 'div',
  className,
  disableToasts,
}: DhaakonProviderProps) {
  const content = disableToasts ? children : <ToastProvider>{children}</ToastProvider>;
  return (
    <Tag
      className={cn('dhk-root', theme === 'dark' && 'dhk-dark', theme === 'light' && 'dhk-light', className)}
      data-theme={theme}
    >
      {content}
    </Tag>
  );
}
