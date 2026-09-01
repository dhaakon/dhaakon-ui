import { type ReactNode } from 'react';
import {
  GridList as AriaGridList,
  GridListItem as AriaGridListItem,
  Button as AriaButton,
  type GridListProps as AriaGridListProps,
  type GridListItemProps as AriaGridListItemProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { Checkbox } from '../Checkbox/Checkbox';

export interface GridListProps<T extends object> extends Omit<AriaGridListProps<T>, 'className'> {
  /** Shown when there are no items. */
  emptyText?: ReactNode;
  className?: string;
}

/**
 * A selectable, keyboard-navigable list — rows that may hold their own
 * buttons and links.
 *
 * Between this and `Table`: reach for `GridList` when each row is a single
 * thing with actions, and `DataTable` when the row is a record with columns
 * worth comparing down the page.
 */
export function GridList<T extends object>({ emptyText, className, ...rest }: GridListProps<T>) {
  return (
    <AriaGridList
      {...rest}
      className={cn('dhk-gridlist', className)}
      renderEmptyState={
        emptyText != null ? () => <div className="dhk-gridlist__empty">{emptyText}</div> : undefined
      }
    />
  );
}

export interface GridListItemProps extends Omit<AriaGridListItemProps, 'className' | 'children'> {
  children?: ReactNode;
  className?: string;
}

/**
 * One row. Renders its own selection checkbox when the list allows selection —
 * React Aria's `slot="selection"` wires it to the list's state.
 */
export function GridListItem({ children, className, ...rest }: GridListItemProps) {
  return (
    <AriaGridListItem {...rest} className={cn('dhk-gridlist__item', className)}>
      {({ selectionMode, selectionBehavior }) => (
        <>
          {selectionMode !== 'none' && selectionBehavior === 'toggle' && (
            <Checkbox slot="selection" />
          )}
          {children}
        </>
      )}
    </AriaGridListItem>
  );
}

/** An action button inside a row that will not toggle the row's selection. */
export function GridListAction({
  children,
  onPress,
  'aria-label': ariaLabel,
}: {
  children: ReactNode;
  onPress?: () => void;
  'aria-label'?: string;
}) {
  return (
    <AriaButton
      aria-label={ariaLabel}
      onPress={onPress}
      className="dhk-btn dhk-btn--ghost dhk-btn--sm"
      style={{ marginInlineStart: 'auto' }}
    >
      {children}
    </AriaButton>
  );
}
