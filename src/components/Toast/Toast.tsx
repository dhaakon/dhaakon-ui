import {
  createContext,
  useCallback,
  useContext,
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
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: string) => {
    setItems((list) => list.filter((t) => t.id !== id));
    const h = timers.current.get(id);
    if (h) {
      clearTimeout(h);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (opts: ToastOptions) => {
      const id = Math.random().toString(36).slice(2);
      setItems((list) => [...list, { ...opts, id }]);
      const duration = opts.duration ?? 5000;
      if (duration > 0) {
        timers.current.set(
          id,
          setTimeout(() => dismiss(id), duration),
        );
      }
      return id;
    },
    [dismiss],
  );

  const api = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <Ctx.Provider value={api}>
      {children}
      {items.length > 0 && (
        <div className="dhk-toaster" role="region" aria-label="Notifications">
          {items.map((t) => (
            <div key={t.id} className="dhk-toast" data-tone={t.tone ?? 'neutral'} role="status">
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
      )}
    </Ctx.Provider>
  );
}
