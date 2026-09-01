import { type ReactNode } from 'react';
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  type CheckboxProps as AriaCheckboxProps,
  type CheckboxGroupProps as AriaCheckboxGroupProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { CheckIcon, MinusIcon } from '../../lib/icons';

export interface CheckboxProps extends Omit<AriaCheckboxProps, 'children' | 'className'> {
  children?: ReactNode;
  /** Secondary line under the label. */
  description?: ReactNode;
  className?: string;
}

/**
 * A single checkbox. Supports `isIndeterminate` for parent/child trees.
 * Keyboard, labelling and form integration come from React Aria.
 */
export function Checkbox({ children, description, className, ...rest }: CheckboxProps) {
  return (
    <AriaCheckbox {...rest} className={cn('dhk-checkbox', className)}>
      {({ isIndeterminate }) => (
        <>
          <span className="dhk-checkbox__box" aria-hidden>
            {isIndeterminate ? <MinusIcon /> : <CheckIcon />}
          </span>
          {(children != null || description != null) && (
            <span className="dhk-checkbox__text">
              {children}
              {description != null && <span className="dhk-control-desc">{description}</span>}
            </span>
          )}
        </>
      )}
    </AriaCheckbox>
  );
}

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'children' | 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  /** Error message; also flips the group into its invalid state. */
  errorMessage?: ReactNode;
  orientation?: 'vertical' | 'horizontal';
  children: ReactNode;
  className?: string;
}

/** Groups checkboxes under one label with shared validation. */
export function CheckboxGroup({
  label,
  description,
  errorMessage,
  orientation = 'vertical',
  children,
  className,
  ...rest
}: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      {...rest}
      data-orientation={orientation}
      className={cn('dhk-control-group', className)}
    >
      {label != null && <span className="dhk-control-label">{label}</span>}
      <div className="dhk-control-group__items">{children}</div>
      {description != null && errorMessage == null && (
        <span className="dhk-control-desc">{description}</span>
      )}
      {errorMessage != null && (
        <span className="dhk-control-error" role="alert">
          {errorMessage}
        </span>
      )}
    </AriaCheckboxGroup>
  );
}
