import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { useField } from '../Field/Field';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  mono?: boolean;
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { mono, invalid, className, id, required, 'aria-describedby': describedBy, ...rest },
  ref,
) {
  const field = useField();
  const isInvalid = invalid ?? field?.invalid ?? false;
  const described = [describedBy, field?.hintId, field?.errorId].filter(Boolean).join(' ') || undefined;

  return (
    <textarea
      ref={ref}
      id={field?.id ?? id}
      required={required ?? field?.required}
      aria-invalid={isInvalid || undefined}
      aria-describedby={described}
      className={cn('dhk-textarea', mono && 'dhk-input--mono', className)}
      {...rest}
    />
  );
});
