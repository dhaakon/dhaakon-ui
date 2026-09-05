import { type ReactNode } from 'react';
import {
  Autocomplete,
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  SearchField,
  Select,
  SelectValue,
  Text,
  useFilter,
  type SelectProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { hasFieldMessage } from '../../lib/fieldMessage';
import { CheckIcon, ChevronDownIcon, SearchIcon } from '../../lib/icons';

export interface MultiSelectOption {
  /** Stable unique string key, also used when the field submits in a form. */
  id: string;
  label: string;
  description?: string;
  isDisabled?: boolean;
}

export interface MultiSelectProps extends Omit<
  SelectProps<MultiSelectOption, 'multiple'>,
  'children' | 'className' | 'selectionMode' | 'value' | 'defaultValue' | 'onChange'
> {
  label: string;
  options: readonly MultiSelectOption[];
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  description?: ReactNode;
  errorMessage?: ReactNode;
  searchPlaceholder?: string;
  emptyText?: string;
  className?: string;
}

/** Searchable multiple selection with one owner for selection, validation and form data. */
export function MultiSelect({
  label,
  options,
  value,
  defaultValue,
  onChange,
  description,
  errorMessage,
  searchPlaceholder = 'Search options…',
  emptyText = 'No matching options',
  placeholder = 'Choose options…',
  className,
  isInvalid,
  ...rest
}: MultiSelectProps) {
  const hasError = hasFieldMessage(errorMessage);
  const { contains } = useFilter({ sensitivity: 'base' });

  return (
    <Select<MultiSelectOption, 'multiple'>
      {...rest}
      selectionMode="multiple"
      value={value}
      defaultValue={defaultValue}
      onChange={(keys) => onChange?.(keys.map(String))}
      placeholder={placeholder}
      isInvalid={isInvalid ?? (hasError || undefined)}
      className={cn('dhk-field dhk-multiselect', className)}
    >
      {({ isInvalid: validationInvalid }) => <>
      <Label className="dhk-control-label">{label}</Label>
      <Button
        className="dhk-select-trigger"
        // RAC filters aria-invalid from Button props. Forward the actual Select
        // validation state to the DOM, including native validation after submit.
        render={(buttonProps) => <button {...buttonProps} aria-invalid={validationInvalid || undefined} />}
      >
        <SelectValue<MultiSelectOption> className="dhk-select-trigger__value">
          {({ isPlaceholder, selectedText }) => isPlaceholder ? placeholder : selectedText}
        </SelectValue>
        <ChevronDownIcon className="dhk-select-trigger__chevron" />
      </Button>
      {description != null && <Text slot="description" className="dhk-control-desc">{description}</Text>}
      <FieldError className="dhk-control-error">{hasError ? errorMessage : undefined}</FieldError>
      <Popover className="dhk-popover dhk-multiselect__popover" placement="bottom start">
        <Autocomplete filter={contains}>
          <SearchField aria-label={`Search ${label}`} className="dhk-multiselect__search">
            <SearchIcon aria-hidden="true" />
            <Input autoFocus placeholder={searchPlaceholder} />
            <Button aria-label="Clear search">×</Button>
          </SearchField>
          <ListBox<MultiSelectOption>
            items={options}
            className="dhk-listbox dhk-multiselect__list"
            renderEmptyState={() => <div className="dhk-listbox__empty">{emptyText}</div>}
          >
            {(option) => (
              <ListBoxItem
                id={option.id}
                textValue={option.label}
                isDisabled={option.isDisabled}
                className="dhk-listbox__item dhk-multiselect__option"
              >
                <span>
                  <Text slot="label">{option.label}</Text>
                  {option.description && <Text slot="description" className="dhk-multiselect__description">{option.description}</Text>}
                </span>
                <CheckIcon className="dhk-listbox__check" />
              </ListBoxItem>
            )}
          </ListBox>
        </Autocomplete>
        <p className="dhk-multiselect__hint">Select multiple options. Escape clears search, then closes.</p>
      </Popover>
      </>}
    </Select>
  );
}
