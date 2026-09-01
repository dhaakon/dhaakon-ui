import { createContext, useContext, useId, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface FieldCtx {
  id: string;
  hintId?: string;
  errorId?: string;
  invalid: boolean;
}
const Ctx = createContext<FieldCtx | null>(null);

/** Access the enclosing `<Field>` wiring from a custom control. */
export function useField(): FieldCtx | null {
  return useContext(Ctx);
}

export interface FieldProps {
  label?: ReactNode;
  /** Helper text shown below the control. */
  hint?: ReactNode;
  /** Error message; also flips the control into its invalid state. */
  error?: ReactNode;
  required?: boolean;
  className?: string;
  children: ReactNode;
  /** Override the generated id shared by label + control. */
  id?: string;
}

/**
 * Labelled form row. Wires `htmlFor` / `id` / `aria-describedby` /
 * `aria-invalid` to a single child control (Input, Textarea, or your own).
 */
export function Field({ label, hint, error, required, className, children, id: idProp }: FieldProps) {
  const auto = useId();
  const id = idProp ?? auto;
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <Ctx.Provider value={{ id, hintId, errorId, invalid: error != null }}>
      <div className={cn('dhk-field', className)}>
        {label != null && (
          <label className="dhk-label" htmlFor={id}>
            {label}
            {required && <span className="dhk-label__req" aria-hidden>*</span>}
          </label>
        )}
        {children}
        {hint != null && error == null && (
          <p className="dhk-field__hint" id={hintId}>{hint}</p>
        )}
        {error != null && (
          <p className="dhk-field__error" id={errorId} role="alert">{error}</p>
        )}
      </div>
    </Ctx.Provider>
  );
}
