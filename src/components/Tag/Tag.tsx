import { type ReactNode } from 'react';
import {
  TagGroup as AriaTagGroup,
  TagList as AriaTagList,
  Tag as AriaTag,
  Button as AriaButton,
  type TagGroupProps as AriaTagGroupProps,
  type TagListProps as AriaTagListProps,
  type TagProps as AriaTagProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { XIcon } from '../../lib/icons';

export interface TagGroupProps extends Omit<AriaTagGroupProps, 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
}

/**
 * A set of removable/selectable tags — filters, recipients, labels.
 *
 * `Badge` is the static cousin: use it for read-only status. Reach for
 * `TagGroup` as soon as a chip can be selected or removed, since it brings
 * arrow-key navigation and Delete/Backspace removal.
 */
export function TagGroup({ label, description, className, children, ...rest }: TagGroupProps) {
  return (
    <AriaTagGroup {...rest} className={cn('dhk-taggroup', className)}>
      {label != null && <span className="dhk-control-label">{label}</span>}
      {children}
      {description != null && <span className="dhk-control-desc">{description}</span>}
    </AriaTagGroup>
  );
}

export interface TagListProps<T extends object> extends Omit<AriaTagListProps<T>, 'className'> {
  className?: string;
}

export function TagList<T extends object>({ className, ...rest }: TagListProps<T>) {
  return <AriaTagList {...rest} className={cn('dhk-taglist', className)} />;
}

export interface TagProps extends Omit<AriaTagProps, 'className' | 'children'> {
  children?: ReactNode;
  className?: string;
}

/**
 * One tag. Renders a remove button automatically when the parent `TagGroup`
 * has an `onRemove` handler.
 */
export function Tag({ children, className, ...rest }: TagProps) {
  return (
    <AriaTag {...rest} className={cn('dhk-tag', className)}>
      {({ allowsRemoving }) => (
        <>
          {children}
          {allowsRemoving && (
            <AriaButton slot="remove" className="dhk-tag__remove" aria-label="Remove">
              <XIcon />
            </AriaButton>
          )}
        </>
      )}
    </AriaTag>
  );
}
