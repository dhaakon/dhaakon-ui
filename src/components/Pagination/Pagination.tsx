import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { ChevronLeftIcon, ChevronRightIcon } from '../../lib/icons';

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** 1-based. */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** Page buttons either side of the current one before eliding. */
  siblings?: number;
  /** Left-hand summary, e.g. "41–60 of 312". */
  summary?: ReactNode;
  /** Prev/next only — for cursor-based sources with no known page count. */
  compact?: boolean;
}

/**
 * Page navigation. Builds an elided window (1 … 4 5 6 … 20) rather than
 * rendering every page.
 */
export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblings = 1,
  summary,
  compact,
  className,
  ...rest
}: PaginationProps) {
  const go = (n: number) => onPageChange(Math.min(pageCount, Math.max(1, n)));

  return (
    <nav aria-label="Pagination" className={cn('dhk-pagination', className)} {...rest}>
      <span className="dhk-pagination__summary">
        {summary ?? `Page ${page} of ${pageCount}`}
      </span>
      <div className="dhk-pagination__pages">
        <button
          type="button"
          className="dhk-pagination__page"
          onClick={() => go(page - 1)}
          disabled={page <= 1}
          aria-label="Previous page"
        >
          <ChevronLeftIcon />
        </button>

        {!compact &&
          pageWindow(page, pageCount, siblings).map((p, i) =>
            p === 'gap' ? (
              <span key={`gap-${i}`} className="dhk-pagination__ellipsis" aria-hidden>
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                className="dhk-pagination__page"
                aria-current={p === page ? 'page' : undefined}
                aria-label={`Page ${p}`}
                onClick={() => go(p)}
              >
                {p}
              </button>
            ),
          )}

        <button
          type="button"
          className="dhk-pagination__page"
          onClick={() => go(page + 1)}
          disabled={page >= pageCount}
          aria-label="Next page"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </nav>
  );
}

/** First, last, and `siblings` either side of current — gaps elided. */
function pageWindow(page: number, count: number, siblings: number): (number | 'gap')[] {
  // Small enough to show whole: first + last + current + siblings + 2 gaps.
  if (count <= siblings * 2 + 5) {
    return Array.from({ length: count }, (_, i) => i + 1);
  }

  const start = Math.max(2, page - siblings);
  const end = Math.min(count - 1, page + siblings);
  const out: (number | 'gap')[] = [1];

  if (start > 2) out.push('gap');
  for (let p = start; p <= end; p++) out.push(p);
  if (end < count - 1) out.push('gap');

  out.push(count);
  return out;
}
