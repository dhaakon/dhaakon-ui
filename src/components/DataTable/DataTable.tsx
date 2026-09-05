import { type ReactNode } from 'react';
import {
  Table as AriaTable,
  TableHeader as AriaTableHeader,
  TableBody as AriaTableBody,
  Column as AriaColumn,
  Row as AriaRow,
  Cell as AriaCell,
  type TableProps as AriaTableProps,
  type ColumnProps as AriaColumnProps,
  type RowProps as AriaRowProps,
  type CellProps as AriaCellProps,
  type TableBodyProps as AriaTableBodyProps,
  type TableHeaderProps as AriaTableHeaderProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { Checkbox } from '../Checkbox/Checkbox';

export interface DataTableProps extends Omit<AriaTableProps, 'className'> {
  className?: string;
}

/**
 * A table with sortable columns, selectable rows and full keyboard navigation
 * — arrow keys move cell to cell, Space selects, Shift+click extends.
 *
 * The simpler `Table` renders columns and rows from data and is the right
 * choice for read-only display. Use `DataTable` when rows are selectable or
 * columns sortable; that is what the extra composition buys.
 */
export function DataTable({ className, ...rest }: DataTableProps) {
  return (
    <div className="dhk-datatable-wrap">
      <AriaTable {...rest} className={cn('dhk-datatable', className)} />
    </div>
  );
}

export function DataTableHeader<T extends object>(props: AriaTableHeaderProps<T>) {
  return <AriaTableHeader {...props} />;
}

export function DataTableBody<T extends object>({
  emptyText,
  renderEmptyState,
  ...rest
}: AriaTableBodyProps<T> & { emptyText?: ReactNode }) {
  return (
    <AriaTableBody
      {...rest}
      renderEmptyState={
        emptyText != null ? () => <div className="dhk-datatable__empty">{emptyText}</div> : renderEmptyState
      }
    />
  );
}

export interface ColumnProps extends Omit<AriaColumnProps, 'className' | 'children'> {
  children?: ReactNode;
  /** Right-align and switch to Plex Mono so digits line up. */
  numeric?: boolean;
  className?: string;
}

export function DataColumn({ children, numeric, className, ...rest }: ColumnProps) {
  return (
    <AriaColumn
      {...rest}
      className={cn('dhk-datatable__column', numeric && 'dhk-datatable__num', className)}
    >
      {({ allowsSorting, sortDirection }) => (
        <>
          {children}
          {allowsSorting && (
            <span aria-hidden className="dhk-datatable__sort">
              {sortDirection === 'ascending' ? '↑' : sortDirection === 'descending' ? '↓' : '↕'}
            </span>
          )}
        </>
      )}
    </AriaColumn>
  );
}

/** A column holding nothing but each row's selection checkbox. */
export function SelectionColumn() {
  return (
    <AriaColumn className="dhk-datatable__column" width={44} minWidth={44}>
      <Checkbox slot="selection" />
    </AriaColumn>
  );
}

export interface RowProps<T extends object> extends Omit<AriaRowProps<T>, 'className' | 'children'> {
  /** Prepend a cell holding this row's selection checkbox. */
  selectable?: boolean;
  children?: ReactNode;
  className?: string;
}

export function DataRow<T extends object>({
  selectable,
  children,
  className,
  ...rest
}: RowProps<T>) {
  return (
    <AriaRow {...rest} className={cn('dhk-datatable__row', className)}>
      {selectable && (
        <AriaCell className="dhk-datatable__cell">
          <Checkbox slot="selection" />
        </AriaCell>
      )}
      {children}
    </AriaRow>
  );
}

export interface CellProps extends Omit<AriaCellProps, 'className'> {
  numeric?: boolean;
  className?: string;
}

export function DataCell({ numeric, className, ...rest }: CellProps) {
  return (
    <AriaCell
      {...rest}
      className={cn('dhk-datatable__cell', numeric && 'dhk-datatable__num', className)}
    />
  );
}
