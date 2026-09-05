import { useId, useRef, useState, type ClipboardEvent } from 'react';
import { cn } from '../lib/cn';

export interface VerificationCodeInputProps {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Fired when an edit produces a changed, complete code. */
  onComplete?: (value: string) => void;
  label?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

/**
 * One native OTP input with presentational cells: autofill, paste, selection,
 * mobile deletion and screen readers all operate on the same string.
 */
export function VerificationCodeInput({
  length = 6,
  value,
  defaultValue = '',
  onChange,
  onComplete,
  label = 'Verification code',
  errorMessage,
  isDisabled,
  autoFocus,
  className,
}: VerificationCodeInputProps) {
  if (!Number.isInteger(length) || length < 1 || length > 32) {
    throw new RangeError('VerificationCodeInput length must be an integer from 1 to 32.');
  }
  const clean = (text: string) => text.replace(/\D/g, '').slice(0, length);
  const [internal, setInternal] = useState(() => clean(defaultValue));
  const code = clean(value ?? internal);
  const [active, setActive] = useState<number | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const errorId = useId();

  function commit(raw: string) {
    const next = clean(raw);
    if (next === code) return;
    if (value === undefined) setInternal(next);
    onChange?.(next);
    if (next.length === length) onComplete?.(next);
  }

  function updateCaret() {
    setActive(Math.min(ref.current?.selectionStart ?? code.length, length - 1));
  }

  function onPaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const input = event.currentTarget;
    const digits = event.clipboardData.getData('text').replace(/\D/g, '');
    const start = input.selectionStart ?? code.length;
    const end = input.selectionEnd ?? start;
    // A full code replaces the existing value, including a partially entered code.
    commit(digits.length >= length ? digits : code.slice(0, start) + digits + code.slice(end));
  }

  return (
    <div className={cn('dhk-codeinput', className)} data-invalid={errorMessage ? '' : undefined}>
      <input
        ref={ref}
        className="dhk-codeinput__native"
        value={code}
        type="text"
        inputMode="numeric"
        autoComplete="one-time-code"
        maxLength={length}
        aria-label={label}
        aria-describedby={errorMessage ? errorId : undefined}
        aria-invalid={errorMessage ? true : undefined}
        disabled={isDisabled}
        autoFocus={autoFocus}
        onChange={(event) => { commit(event.target.value); updateCaret(); }}
        onPaste={onPaste}
        onSelect={updateCaret}
        onFocus={updateCaret}
        onBlur={() => setActive(null)}
      />
      <div className="dhk-codeinput__boxes" aria-hidden="true">
        {Array.from({ length }, (_, index) => (
          <span
            key={index}
            className="dhk-codeinput__box"
            data-active={active === index ? '' : undefined}
            data-disabled={isDisabled ? '' : undefined}
            onMouseDown={(event) => {
              if (isDisabled) return;
              event.preventDefault();
              ref.current?.focus();
              ref.current?.setSelectionRange(Math.min(index, code.length), Math.min(index + 1, code.length));
              setActive(Math.min(index, code.length, length - 1));
            }}
          >
            {code[index] ?? ''}
          </span>
        ))}
      </div>
      {errorMessage && <span id={errorId} className="dhk-control-error" role="alert">{errorMessage}</span>}
    </div>
  );
}
