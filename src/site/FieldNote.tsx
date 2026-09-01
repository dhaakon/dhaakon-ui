import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface FieldNoteProps extends HTMLAttributes<HTMLElement> {
  /** Bracketed label — "Field note 02.1", "Why this is pertinent". */
  label: ReactNode;
  children: ReactNode;
}

/** A `[bracketed]` serif aside — dhaakon.com's margin annotations. */
export function FieldNote({ label, children, className, ...rest }: FieldNoteProps) {
  return (
    <aside className={cn('dhk-fieldnote', className)} {...rest}>
      <span className="dhk-fieldnote__label">{label}</span>
      <div className="dhk-fieldnote__body">{children}</div>
    </aside>
  );
}
