import { useId, useState, type KeyboardEvent } from 'react';
import { cn } from '../lib/cn';

export interface SegmentedOption {
  value: string;
  label: string;
}

export interface SegmentedProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  /** Show the "01 / 03" position counter above the control. Default true. */
  counter?: boolean;
  'aria-label'?: string;
  className?: string;
}

/** The numbered pill switcher — `01 Practitioner / 02 Educator / 03 Systems builder`. */
export function Segmented({
  options,
  value,
  defaultValue,
  onValueChange,
  counter = true,
  'aria-label': ariaLabel,
  className,
}: SegmentedProps) {
  const [internal, setInternal] = useState(defaultValue ?? options[0]?.value ?? '');
  const current = value ?? internal;
  const activeIndex = Math.max(0, options.findIndex((o) => o.value === current));
  const baseId = useId();
  const pad = (n: number) => String(n).padStart(2, '0');

  function select(v: string) {
    if (value === undefined) setInternal(v);
    onValueChange?.(v);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (activeIndex + dir + options.length) % options.length;
    select(options[next].value);
    (e.currentTarget.children[next] as HTMLElement | undefined)?.focus();
  }

  return (
    <div className={cn('dhk-segmented', className)}>
      {counter && (
        <span className="dhk-segmented__count">
          {pad(activeIndex + 1)} / {pad(options.length)}
        </span>
      )}
      <div className="dhk-segmented__list" role="tablist" aria-label={ariaLabel} onKeyDown={onKeyDown}>
        {options.map((o, i) => {
          const selected = o.value === current;
          return (
            <button
              key={o.value}
              type="button"
              role="tab"
              id={`${baseId}-${o.value}`}
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className="dhk-segmented__item"
              onClick={() => select(o.value)}
            >
              <span className="dhk-segmented__item-index">{pad(i + 1)}</span>
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
