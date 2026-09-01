import {
  createContext,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cn } from '../../lib/cn';

interface TabsCtx {
  value: string;
  setValue: (v: string) => void;
  baseId: string;
  register: (v: string, el: HTMLButtonElement | null) => void;
  focusStep: (from: string, dir: 1 | -1) => void;
}
const Ctx = createContext<TabsCtx | null>(null);
function useTabs(name: string): TabsCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error(`<${name}> must be used inside <Tabs>`);
  return ctx;
}

export interface TabsProps {
  /** Controlled selected value. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  children: ReactNode;
}

export function Tabs({ value, defaultValue, onValueChange, className, children }: TabsProps) {
  const baseId = useId();
  const [internal, setInternal] = useState(defaultValue ?? '');
  const current = value ?? internal;
  const order = useRef<string[]>([]);
  const els = useRef(new Map<string, HTMLButtonElement>());

  const setValue = useCallback(
    (v: string) => {
      if (value === undefined) setInternal(v);
      onValueChange?.(v);
    },
    [value, onValueChange],
  );

  const register = useCallback((v: string, el: HTMLButtonElement | null) => {
    if (el) {
      els.current.set(v, el);
      if (!order.current.includes(v)) order.current.push(v);
    } else {
      els.current.delete(v);
      order.current = order.current.filter((x) => x !== v);
    }
  }, []);

  const focusStep = useCallback(
    (from: string, dir: 1 | -1) => {
      const list = order.current;
      if (!list.length) return;
      const i = list.indexOf(from);
      const next = list[(i + dir + list.length) % list.length];
      els.current.get(next)?.focus();
      setValue(next);
    },
    [setValue],
  );

  return (
    <Ctx.Provider value={{ value: current, setValue, baseId, register, focusStep }}>
      <div className={cn('dhk-tabs', className)}>{children}</div>
    </Ctx.Provider>
  );
}

export function TabList({ className, children, label }: { className?: string; children: ReactNode; label?: string }) {
  return (
    <div className={cn('dhk-tabs__list', className)} role="tablist" aria-label={label}>
      {children}
    </div>
  );
}

export interface TabProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function Tab({ value, disabled, className, children }: TabProps) {
  const { value: current, setValue, baseId, register, focusStep } = useTabs('Tab');
  const selected = current === value;

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      focusStep(value, 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      focusStep(value, -1);
    }
  }

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-controls={`${baseId}-panel-${value}`}
      aria-selected={selected}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      ref={(el) => register(value, el)}
      className={cn('dhk-tabs__tab', className)}
      onClick={() => setValue(value)}
      onKeyDown={onKeyDown}
    >
      {children}
    </button>
  );
}

export interface TabPanelProps {
  value: string;
  className?: string;
  children: ReactNode;
}

export function TabPanel({ value, className, children }: TabPanelProps) {
  const { value: current, baseId } = useTabs('TabPanel');
  if (current !== value) return null;
  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={cn('dhk-tabs__panel', className)}
    >
      {children}
    </div>
  );
}
