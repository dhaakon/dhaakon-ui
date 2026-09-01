import { useId, useState, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export function NumberedList({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('dhk-numlist', className)}>{children}</div>;
}

export interface NumberedItemProps {
  index: ReactNode;
  title: ReactNode;
  /** The equation aside — e.g. "Adoption ≠ impact". */
  equation?: ReactNode;
  /** `+` or `−` marker on the right, as on dhaakon.com. */
  sign?: '+' | '−';
  /** Small accent label above the body — "Failure signal 01". */
  signal?: ReactNode;
  defaultOpen?: boolean;
  /** Force static (non-collapsible) — renders the body always open, no button. */
  static?: boolean;
  children?: ReactNode;
}

export function NumberedItem({
  index,
  title,
  equation,
  sign,
  signal,
  defaultOpen = false,
  static: isStatic,
  children,
}: NumberedItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const hasBody = children != null;
  const expanded = isStatic || open;

  const head = (
    <>
      <span className="dhk-numitem__index">{index}</span>
      <span>
        <span className="dhk-numitem__title">{title}</span>
        {equation != null && <span className="dhk-numitem__equation">{equation}</span>}
      </span>
      {sign != null && <span className="dhk-numitem__sign" aria-hidden>{expanded && hasBody ? '−' : sign}</span>}
    </>
  );

  return (
    <div className="dhk-numitem">
      {hasBody && !isStatic ? (
        <button
          type="button"
          className="dhk-numitem__head"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((v) => !v)}
        >
          {head}
        </button>
      ) : (
        <div className="dhk-numitem__head" style={{ cursor: 'default' }}>
          {head}
        </div>
      )}
      {hasBody && expanded && (
        <div className="dhk-numitem__body" id={id}>
          {signal != null && <span className="dhk-numitem__signal">{signal}</span>}
          {children}
        </div>
      )}
    </div>
  );
}
