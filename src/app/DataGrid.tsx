import { type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface DataGridProps {
  /** A `<FilterBar>`, or any search/filter row. */
  toolbar?: ReactNode;
  /** The `<DataTable>` itself. */
  children: ReactNode;
  /** A `<PaginationBar>`. */
  pagination?: ReactNode;
  /**
   * Shown instead of the table when there are no rows — an `<EmptyState>`.
   * The toolbar stays visible so a filter can be cleared.
   */
  empty?: ReactNode;
  isEmpty?: boolean;
  /** Dim the table and mark it busy while refetching. */
  isLoading?: boolean;
  className?: string;
}

/**
 * Filter bar, table and pagination as one block.
 *
 * When empty it keeps the toolbar on screen and swaps only the table — hiding
 * the filters along with the rows leaves no way to undo the filter that
 * emptied it.
 *
 * ```tsx
 * <DataGrid toolbar={<FilterBar … />} pagination={<PaginationBar … />}>
 *   <DataTable …>…</DataTable>
 * </DataGrid>
 * ```
 */
export function DataGrid({
  toolbar,
  children,
  pagination,
  empty,
  isEmpty,
  isLoading,
  className,
}: DataGridProps) {
  return (
    <div className={cn(className)}>
      {toolbar}
      <div
        aria-busy={isLoading || undefined}
        style={{
          opacity: isLoading ? 0.55 : undefined,
          transition: 'opacity var(--dhk-duration) var(--dhk-ease)',
        }}
      >
        {isEmpty && empty != null ? empty : children}
      </div>
      {!isEmpty && pagination}
    </div>
  );
}
