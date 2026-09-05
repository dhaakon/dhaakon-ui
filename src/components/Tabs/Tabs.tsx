import { type ReactNode } from 'react';
import {
  Tabs as AriaTabs,
  TabList as AriaTabList,
  Tab as AriaTab,
  TabPanel as AriaTabPanel,
} from 'react-aria-components';
import { cn } from '../../lib/cn';

export interface TabsProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  orientation?: 'horizontal' | 'vertical';
  /** Automatic activation by default; manual activation uses Enter or Space. */
  keyboardActivation?: 'automatic' | 'manual';
  className?: string;
  children: ReactNode;
}

/** React Aria owns focus, enabled-key navigation, RTL and selection. */
export function Tabs({ value, defaultValue, onValueChange, className, children, ...rest }: TabsProps) {
  return (
    <AriaTabs
      {...rest}
      selectedKey={value}
      defaultSelectedKey={defaultValue}
      onSelectionChange={(key) => onValueChange?.(String(key))}
      className={cn('dhk-tabs', className)}
    >
      {children}
    </AriaTabs>
  );
}

export function TabList({ className, children, label }: { className?: string; children: ReactNode; label?: string }) {
  return <AriaTabList className={cn('dhk-tabs__list', className)} aria-label={label}>{children}</AriaTabList>;
}

export interface TabProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function Tab({ value, disabled, className, children }: TabProps) {
  return <AriaTab id={value} isDisabled={disabled} className={cn('dhk-tabs__tab', className)}>{children}</AriaTab>;
}

export interface TabPanelProps {
  value: string;
  className?: string;
  children: ReactNode;
}

export function TabPanel({ value, className, children }: TabPanelProps) {
  return <AriaTabPanel id={value} className={cn('dhk-tabs__panel', className)}>{children}</AriaTabPanel>;
}
