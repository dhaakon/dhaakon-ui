import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';
import { useField } from '../Field/Field';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: 'sm' | 'md' | 'lg';
  /** Monospace (IBM Plex Mono) — for ids, tokens, keys. */
  mono?: boolean;
  /** Force the invalid state outside of a `<Field error>`. */
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = 'md', mono, invalid, className, id, required, 'aria-describedby': describedBy, ...rest },
  ref,
) {
  const field = useField();
  const isInvalid = invalid ?? field?.invalid ?? false;
  const described = [describedBy, field?.hintId, field?.errorId].filter(Boolean).join(' ') || undefined;

  return (
    <input
      ref={ref}
      id={field?.id ?? id}
      required={required ?? field?.required}
      aria-invalid={isInvalid || undefined}
      aria-describedby={described}
      className={cn(
        'dhk-input',
        size !== 'md' && `dhk-input--${size}`,
        mono && 'dhk-input--mono',
        className,
      )}
      {...rest}
    />
  );
});
