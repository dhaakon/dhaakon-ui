import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { I18nProvider } from 'react-aria-components';
import { useLocale } from 'react-aria/I18nProvider';
import { UNSAFE_PortalProvider } from 'react-aria/PortalProvider';
import { cn } from '../../lib/cn';
import { ToastProvider } from '../Toast/Toast';

export interface DhaakonProviderProps {
  children: ReactNode;
  /**
   * Force a theme. Omit to follow the `data-theme` attribute on `<html>`
   * (or the OS setting when that is absent).
   */
  theme?: 'light' | 'dark';
  /** Opt-in compact controls for dense instruments. Inherits when omitted. */
  density?: 'comfortable' | 'compact';
  /** BCP 47 locale for React Aria formatting and keyboard direction. */
  locale?: string;
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
export function DhaakonProvider({ locale, ...props }: DhaakonProviderProps) {
  const content = <ProviderScope {...props} />;
  return locale ? <I18nProvider locale={locale}>{content}</I18nProvider> : content;
}

function ProviderScope({
  children,
  theme,
  density,
  as: Tag = 'div',
  className,
  disableToasts,
}: DhaakonProviderProps) {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [portal, setPortal] = useState<HTMLElement | null>(null);
  const { locale, direction } = useLocale();
  const getContainer = useCallback(() => portal, [portal]);
  const scopeClass = cn('dhk-root', theme === 'dark' && 'dhk-dark', theme === 'light' && 'dhk-light', className);

  useEffect(() => {
    if (!root) return;
    const host = document.createElement('div');
    host.className = 'dhk-root dhk-portal-host';
    host.setAttribute('data-dhk-portal', '');
    document.body.append(host);
    setPortal(host);
    const sync = () => {
      // Portals escape clipping/stacking ancestors, but retain the originating
      // scope's tokens, including nested themes and consumer overrides.
      const computed = getComputedStyle(root);
      host.style.cssText = '';
      for (let index = 0; index < computed.length; index++) {
        const property = computed.item(index);
        if (property.startsWith('--dhk-')) host.style.setProperty(property, computed.getPropertyValue(property));
      }
      host.style.colorScheme = computed.colorScheme;
      host.dir = root.dir;
      host.lang = root.lang;
    };
    sync();
    const observer = new MutationObserver(sync);
    // Observe scope ancestors only, not animation mutations throughout the app.
    let ancestor: HTMLElement | null = root;
    while (ancestor) {
      observer.observe(ancestor, { attributes: true, attributeFilter: ['class', 'style', 'data-theme', 'data-density', 'dir', 'lang'] });
      ancestor = ancestor.parentElement;
    }
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    preference.addEventListener('change', sync);
    window.addEventListener('resize', sync, { passive: true });
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', sync);
      window.removeEventListener('resize', sync);
      host.remove();
    };
  }, [root]);

  const content = disableToasts ? children : <ToastProvider>{children}</ToastProvider>;
  return (
    <Tag
      ref={setRoot}
      className={scopeClass}
      data-theme={theme}
      data-density={density}
      dir={direction}
      lang={locale}
    >
      <UNSAFE_PortalProvider getContainer={getContainer}>{content}</UNSAFE_PortalProvider>
    </Tag>
  );
}
