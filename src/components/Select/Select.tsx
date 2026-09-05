import { type ReactNode } from 'react';
import {
  Label,
  Text,
  FieldError,
  Select as AriaSelect,
  SelectValue,
  Button as AriaButton,
  Popover,
  ListBox,
  ListBoxItem,
  type SelectProps as AriaSelectProps,
  type ListBoxItemProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { hasFieldMessage } from '../../lib/fieldMessage';
import { CheckIcon, ChevronDownIcon } from '../../lib/icons';

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, 'children' | 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  placeholder?: string;
  /** `<SelectItem>` elements, or a render function when using `items`. */
  children: ReactNode | ((item: T) => ReactNode);
  /** Data-driven options; pair with a render function for `children`. */
  items?: Iterable<T>;
  className?: string;
}

/**
 * Single-choice dropdown. Typeahead, arrow-key navigation, collision-aware
 * positioning and screen-reader announcements come from React Aria.
 *
 * ```tsx
 * <Select label="Region" placeholder="Pick one">
 *   <SelectItem id="nuc">homelab-nuc-1</SelectItem>
 * </Select>
 * ```
 */
export function Select<T extends object>({
  label,
  description,
  errorMessage,
  placeholder,
  children,
  items,
  className,
  ...rest
}: SelectProps<T>) {
  const hasError = hasFieldMessage(errorMessage);
  return (
    <AriaSelect {...rest} isInvalid={rest.isInvalid ?? (hasError ? true : undefined)} className={cn('dhk-field', className)}>
      {({ isInvalid }) => <>
      {label != null && <Label className="dhk-control-label">{label}</Label>}
      <AriaButton className="dhk-select-trigger" render={(buttonProps) => <button {...buttonProps} aria-invalid={isInvalid || undefined} />}>
        <SelectValue className="dhk-select-trigger__value">
          {({ isPlaceholder, selectedText }) =>
            isPlaceholder ? (placeholder ?? 'Select…') : selectedText
          }
        </SelectValue>
        <ChevronDownIcon className="dhk-select-trigger__chevron" />
      </AriaButton>
      {description != null && !hasError && (
        <Text slot="description" className="dhk-control-desc">{description}</Text>
      )}
      <FieldError className="dhk-control-error">{hasError ? errorMessage : undefined}</FieldError>
      <Popover className="dhk-popover">
        <ListBox className="dhk-listbox" items={items}>
          {children as never}
        </ListBox>
      </Popover>
      </>}
    </AriaSelect>
  );
}

export interface SelectItemProps extends Omit<ListBoxItemProps, 'className' | 'children'> {
  className?: string;
  children?: ReactNode;
}

/**
 * One option.
 *
 * The check mark means the children are elements rather than bare text, so
 * React Aria cannot derive the item's text on its own — string children are
 * forwarded as `textValue` here. Pass `textValue` explicitly for anything
 * richer, or typeahead and the trigger's selected label go blank.
 */
export function SelectItem({ className, children, textValue, ...rest }: SelectItemProps) {
  return (
    <ListBoxItem
      {...rest}
      textValue={textValue ?? (typeof children === 'string' ? children : undefined)}
      className={cn('dhk-listbox__item', className)}
    >
      <span>{children}</span>
      <CheckIcon className="dhk-listbox__check" />
    </ListBoxItem>
  );
}
