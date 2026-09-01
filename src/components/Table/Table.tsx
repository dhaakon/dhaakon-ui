import { type ReactNode, type TableHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface Column<Row> {
  /** Stable key; also the default cell accessor when `cell` is omitted. */
  key: keyof Row & string;
  header: ReactNode;
  /** Custom cell renderer. */
  cell?: (row: Row, index: number) => ReactNode;
  /** Right-align + monospace — for counts, sizes, dates. */
  numeric?: boolean;
  width?: string | number;
}

export interface TableProps<Row> extends Omit<TableHTMLAttributes<HTMLTableElement>, 'children'> {
  columns: Column<Row>[];
  data: Row[];
  /** Row key accessor. Defaults to the array index. */
  rowKey?: (row: Row, index: number) => string | number;
  caption?: ReactNode;
  hoverable?: boolean;
  dense?: boolean;
  /** Shown in place of the body when `data` is empty. */
  empty?: ReactNode;
}

export function Table<Row>({
  columns,
  data,
  rowKey,
  caption,
  hoverable = true,
  dense,
  empty = 'No rows',
  className,
  ...rest
}: TableProps<Row>) {
  return (
    <div className="dhk-table-wrap">
      <table
        className={cn('dhk-table', hoverable && 'dhk-table--hoverable', dense && 'dhk-table--dense', className)}
        {...rest}
      >
        {caption != null && <caption>{caption}</caption>}
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} scope="col" className={cn(c.numeric && 'dhk-table__num')} style={{ width: c.width }}>
                {c.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ color: 'var(--dhk-text-subtle)' }}>
                {empty}
              </td>
            </tr>
          ) : (
            data.map((row, i) => (
              <tr key={rowKey ? rowKey(row, i) : i}>
                {columns.map((c) => (
                  <td key={c.key} className={cn(c.numeric && 'dhk-table__num')}>
                    {c.cell ? c.cell(row, i) : String((row as Record<string, unknown>)[c.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
