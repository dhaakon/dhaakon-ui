import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { Button } from '../components/Button/Button';

export interface AppliedFilter {
  id: string;
  label: ReactNode;
}

export interface FilterBarProps extends HTMLAttributes<HTMLDivElement> {
  /** A `<SearchField>`; stretches to fill the row. */
  search?: ReactNode;
  /** Filter controls — `<Select>`s, or `<Popover>`s holding checkbox groups. */
  filters?: ReactNode;
  /** Right-aligned: view toggles, an export button. */
  end?: ReactNode;
  /** Chips for what is currently applied. */
  applied?: AppliedFilter[];
  onRemoveFilter?: (id: string) => void;
  onClearAll?: () => void;
  /** Result count, shown beside the chips. */
  resultCount?: ReactNode;
}

/**
 * Search, filter controls, and chips for what is currently applied.
 *
 * Always show the applied filters. An empty table with a filter silently in
 * effect is the most common way a list appears broken.
 */
export function FilterBar({
  search,
  filters,
  end,
  applied = [],
  onRemoveFilter,
  onClearAll,
  resultCount,
  className,
  ...rest
}: FilterBarProps) {
  return (
    <div className={cn('dhk-filterbar', className)} {...rest}>
      <div className="dhk-filterbar__row">
        {search != null && <div className="dhk-filterbar__search">{search}</div>}
        {filters}
        {end != null && <div className="dhk-filterbar__end">{end}</div>}
      </div>
      {(applied.length > 0 || resultCount != null) && (
        <div className="dhk-filterbar__applied">
          {resultCount != null && <span className="dhk-filterbar__count">{resultCount}</span>}
          {applied.map((f) => (
            <span className="dhk-badge" key={f.id}>
              {f.label}
              {onRemoveFilter && (
                <button
                  type="button"
                  className="dhk-tag__remove"
                  aria-label={`Remove filter`}
                  onClick={() => onRemoveFilter(f.id)}
                >
                  ✕
                </button>
              )}
            </span>
          ))}
          {applied.length > 0 && onClearAll && (
            <Button variant="link" onClick={onClearAll} style={{ fontSize: 'var(--dhk-text-xs)' }}>
              Clear all
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
