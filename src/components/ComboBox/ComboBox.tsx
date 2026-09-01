import { type ReactNode } from 'react';
import {
  ComboBox as AriaComboBox,
  Input as AriaInput,
  Group,
  Button as AriaButton,
  Popover,
  ListBox,
  type ComboBoxProps as AriaComboBoxProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { ChevronDownIcon, SearchIcon } from '../../lib/icons';

export interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, 'children' | 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  placeholder?: string;
  /** Show a leading magnifier instead of the trailing chevron. */
  searchIcon?: boolean;
  /** Shown in the popover when filtering yields nothing. */
  emptyText?: ReactNode;
  children: ReactNode | ((item: T) => ReactNode);
  items?: Iterable<T>;
  className?: string;
}

/**
 * A text input that filters a list — autocomplete with free typing.
 * Reuses `SelectItem` for options.
 *
 * Reach for `Select` when the value must come from the list and the list is
 * short; `ComboBox` when it is long enough to need filtering.
 */
export function ComboBox<T extends object>({
  label,
  description,
  errorMessage,
  placeholder,
  searchIcon,
  emptyText = 'No matches',
  children,
  items,
  className,
  ...rest
}: ComboBoxProps<T>) {
  return (
    <AriaComboBox {...rest} className={cn('dhk-field', className)}>
      {label != null && <span className="dhk-control-label">{label}</span>}
      <Group className="dhk-combobox-input">
        {searchIcon && <SearchIcon className="dhk-combobox-input__icon" />}
        <AriaInput placeholder={placeholder} />
        {!searchIcon && (
          <AriaButton className="dhk-combobox-input__btn" aria-label="Show suggestions">
            <ChevronDownIcon />
          </AriaButton>
        )}
      </Group>
      {description != null && errorMessage == null && (
        <span className="dhk-control-desc">{description}</span>
      )}
      {errorMessage != null && (
        <span className="dhk-control-error" role="alert">
          {errorMessage}
        </span>
      )}
      <Popover className="dhk-popover">
        <ListBox
          className="dhk-listbox"
          items={items}
          renderEmptyState={() => <div className="dhk-listbox__empty">{emptyText}</div>}
        >
          {children as never}
        </ListBox>
      </Popover>
    </AriaComboBox>
  );
}
