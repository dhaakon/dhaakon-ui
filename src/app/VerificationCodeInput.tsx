import { useRef, useState, type ClipboardEvent, type KeyboardEvent } from 'react';
import { cn } from '../lib/cn';

export interface VerificationCodeInputProps {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
  /** Fired once every box is filled. */
  onComplete?: (value: string) => void;
  label?: string;
  errorMessage?: string;
  isDisabled?: boolean;
  autoFocus?: boolean;
  className?: string;
}

/**
 * One box per character of a one-time code.
 *
 * Pasting the whole code into any box fills the rest — people paste these far
 * more often than they type them, and a split input that rejects a paste is
 * the classic version of this control done badly. Backspace on an empty box
 * steps back; ← and → move without editing.
 */
export function VerificationCodeInput({
  length = 6,
  value,
  onChange,
  onComplete,
  label = 'Verification code',
  errorMessage,
  isDisabled,
  autoFocus,
  className,
}: VerificationCodeInputProps) {
  const [internal, setInternal] = useState('');
  const code = value ?? internal;
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const chars = Array.from({ length }, (_, i) => code[i] ?? '');

  function commit(next: string) {
    const trimmed = next.slice(0, length);
    if (value === undefined) setInternal(trimmed);
    onChange?.(trimmed);
    if (trimmed.length === length) onComplete?.(trimmed);
  }

  function focusBox(i: number) {
    refs.current[Math.max(0, Math.min(length - 1, i))]?.focus();
  }

  function onInput(i: number, raw: string) {
    const digits = raw.replace(/\D/g, '');
    if (!digits) return;
    // A paste lands here too — spread it across the remaining boxes.
    const next = (code.slice(0, i) + digits + code.slice(i + digits.length)).slice(0, length);
    commit(next);
    focusBox(i + digits.length);
  }

  function onKeyDown(i: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace') {
      e.preventDefault();
      if (chars[i]) commit(code.slice(0, i) + code.slice(i + 1));
      else if (i > 0) {
        commit(code.slice(0, i - 1) + code.slice(i));
        focusBox(i - 1);
      }
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focusBox(i - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      focusBox(i + 1);
    }
  }

  function onPaste(i: number, e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    onInput(i, e.clipboardData.getData('text'));
  }

  return (
    <div
      className={cn('dhk-codeinput', className)}
      data-invalid={errorMessage ? '' : undefined}
      role="group"
      aria-label={label}
    >
      <div className="dhk-codeinput__boxes">
        {chars.map((c, i) => (
          <input
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            className="dhk-codeinput__box"
            value={c}
            inputMode="numeric"
            autoComplete={i === 0 ? 'one-time-code' : 'off'}
            aria-label={`${label}, digit ${i + 1} of ${length}`}
            aria-invalid={errorMessage ? true : undefined}
            disabled={isDisabled}
            autoFocus={autoFocus && i === 0}
            onChange={(e) => onInput(i, e.target.value)}
            onKeyDown={(e) => onKeyDown(i, e)}
            onPaste={(e) => onPaste(i, e)}
            onFocus={(e) => e.target.select()}
          />
        ))}
      </div>
      {errorMessage && (
        <span className="dhk-control-error" role="alert">{errorMessage}</span>
      )}
    </div>
  );
}
