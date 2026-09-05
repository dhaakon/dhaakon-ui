import { type ReactNode } from 'react';
import {
  Label,
  Text,
  SearchField as AriaSearchField,
  Input as AriaInput,
  Button as AriaButton,
  type SearchFieldProps as AriaSearchFieldProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { SearchIcon, XIcon } from '../../lib/icons';

export interface SearchFieldProps extends Omit<AriaSearchFieldProps, 'children' | 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  placeholder?: string;
  className?: string;
}

/**
 * A search input with a clear button and Escape-to-clear.
 *
 * Renders `type="search"` with the right role, so screen readers announce it
 * as a search field rather than a generic text box. The clear button hides
 * itself while the field is empty.
 */
export function SearchField({
  label,
  description,
  placeholder,
  className,
  ...rest
}: SearchFieldProps) {
  return (
    <AriaSearchField {...rest} className={cn('dhk-field', className)}>
      {label != null && <Label className="dhk-control-label">{label}</Label>}
      <div className="dhk-searchfield__box">
        <SearchIcon className="dhk-searchfield__icon" />
        <AriaInput placeholder={placeholder} />
        <AriaButton className="dhk-searchfield__clear" aria-label="Clear search">
          <XIcon />
        </AriaButton>
      </div>
      {description != null && <Text slot="description" className="dhk-control-desc">{description}</Text>}
    </AriaSearchField>
  );
}
