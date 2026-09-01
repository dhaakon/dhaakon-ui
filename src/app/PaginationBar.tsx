import { type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { Pagination } from '../components/Pagination/Pagination';
import { Select, SelectItem } from '../components/Select/Select';

export interface PaginationBarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  /** Total rows, used to build the "41–60 of 312" summary. */
  totalItems?: number;
  itemNoun?: string;
}

/**
 * Page size, result range and page navigation on one ruled row.
 *
 * Changing the page size resets to page 1 — staying on page 9 after
 * quadrupling the rows per page lands the reader somewhere they did not ask
 * to be.
 */
export function PaginationBar({
  page,
  pageCount,
  onPageChange,
  pageSize,
  pageSizeOptions = [10, 20, 50, 100],
  onPageSizeChange,
  totalItems,
  itemNoun = 'items',
  className,
  ...rest
}: PaginationBarProps) {
  const summary =
    totalItems != null && pageSize != null
      ? `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, totalItems)} of ${totalItems.toLocaleString()} ${itemNoun}`
      : undefined;

  return (
    <div className={cn('dhk-paginationbar', className)} {...rest}>
      {pageSize != null && onPageSizeChange && (
        <div className="dhk-paginationbar__size">
          <span>Rows</span>
          <Select
            aria-label="Rows per page"
            selectedKey={String(pageSize)}
            onSelectionChange={(k) => {
              onPageSizeChange(Number(k));
              onPageChange(1);
            }}
          >
            {pageSizeOptions.map((n) => (
              <SelectItem key={n} id={String(n)}>{String(n)}</SelectItem>
            ))}
          </Select>
        </div>
      )}
      <Pagination
        page={page}
        pageCount={pageCount}
        onPageChange={onPageChange}
        summary={summary}
        style={{ flex: 1, paddingTop: 0, borderTop: 'none' }}
      />
    </div>
  );
}
