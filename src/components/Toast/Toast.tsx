import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { XIcon } from '../../lib/icons';

export type ToastTone = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger';

export interface ToastOptions {
  title: ReactNode;
  description?: ReactNode;
  tone?: ToastTone;
  /** Auto-dismiss after N ms. `0` keeps it until dismissed. Default 5000. */
  duration?: number;
}

interface ToastRecord extends ToastOptions {
  id: string;
}

interface ToastTimer {
  remaining: number;
  started: number;
  handle?: ReturnType<typeof setTimeout>;
}

interface ToastApi {
  toast: (opts: ToastOptions) => string;
  dismiss: (id: string) => void;
}

const Ctx = createContext<ToastApi | null>(null);

/** Queue a toast from anywhere under `<ToastProvider>` / `<DhaakonProvider>`. */
export function useToast(): ToastApi {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useToast() must be used inside <ToastProvider>');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastRecord[]>([]);
  const timers = useRef(new Map<string, ToastTimer>());
  const paused = useRef(new Set<string>());
  const serial = useRef(0);
  const prefix = useId();
  const mounted = useRef(true);

  const dismiss = useCallback((id: string) => {
    setItems((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer?.handle !== undefined) clearTimeout(timer.handle);
    timers.current.delete(id);
  }, []);

  const resume = useCallback((reason: string) => {
    paused.current.delete(reason);
    if (paused.current.size || !mounted.current) return;
    for (const [id, timer] of timers.current) {
      if (timer.handle !== undefined) continue;
      timer.started = Date.now();
      timer.handle = setTimeout(() => dismiss(id), timer.remaining);
    }
  }, [dismiss]);

  const pause = useCallback((reason: string) => {
    paused.current.add(reason);
    for (const timer of timers.current.values()) {
      if (timer.handle === undefined) continue;
      clearTimeout(timer.handle);
      timer.handle = undefined;
      timer.remaining = Math.max(0, timer.remaining - (Date.now() - timer.started));
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    const visibility = () => document.hidden ? pause('hidden') : resume('hidden');
    document.addEventListener('visibilitychange', visibility);
    resume('unmounted');
    visibility();
    return () => {
      mounted.current = false;
      document.removeEventListener('visibilitychange', visibility);
      pause('unmounted');
    };
  }, [pause, resume]);

  const toast = useCallback(
    (opts: ToastOptions) => {
      const id = `${prefix}-toast-${++serial.current}`;
      if (!mounted.current) return id;
      setItems((list) => [...list, { ...opts, id }]);
      const duration = opts.duration ?? 5000;
      if (Number.isFinite(duration) && duration > 0) {
        timers.current.set(id, { remaining: duration, started: Date.now() });
        resume('new-toast');
      }
      return id;
    },
    [prefix, resume],
  );

  const api = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <Ctx.Provider value={api}>
      {children}
        <div
          className="dhk-toaster"
          role="region"
          aria-label="Notifications"
          aria-live="polite"
          aria-relevant="additions text"
          onMouseEnter={() => pause('hover')}
          onMouseLeave={() => resume('hover')}
          onFocus={() => pause('focus')}
          onBlur={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) resume('focus');
          }}
        >
          {items.map((t) => (
            <div key={t.id} className="dhk-toast" data-tone={t.tone ?? 'neutral'} aria-atomic="true">
              <div className="dhk-toast__title">{t.title}</div>
              <button
                type="button"
                className="dhk-toast__close"
                aria-label="Dismiss"
                onClick={() => dismiss(t.id)}
              >
                <XIcon />
              </button>
              {t.description != null && <div className="dhk-toast__desc">{t.description}</div>}
            </div>
          ))}
        </div>
    </Ctx.Provider>
  );
}
