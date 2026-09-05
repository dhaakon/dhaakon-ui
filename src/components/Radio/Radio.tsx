import { type ReactNode } from 'react';
import {
  Label,
  Text,
  FieldError,
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  type RadioProps as AriaRadioProps,
  type RadioGroupProps as AriaRadioGroupProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { hasFieldMessage } from '../../lib/fieldMessage';

export interface RadioProps extends Omit<AriaRadioProps, 'children' | 'className'> {
  children?: ReactNode;
  description?: ReactNode;
  className?: string;
}

export function Radio({ children, description, className, ...rest }: RadioProps) {
  return (
    <AriaRadio {...rest} className={cn('dhk-radio', className)}>
      <span className="dhk-radio__dot" aria-hidden />
      {(children != null || description != null) && (
        <span className="dhk-radio__text">
          {children}
          {description != null && <span className="dhk-control-desc">{description}</span>}
        </span>
      )}
    </AriaRadio>
  );
}

export interface RadioGroupProps extends Omit<AriaRadioGroupProps, 'children' | 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  children: ReactNode;
  className?: string;
}

/**
 * A single-choice group. Arrow keys move between options and wrap, per
 * WAI-ARIA — handled by React Aria.
 */
export function RadioGroup({
  label,
  description,
  errorMessage,
  orientation = 'vertical',
  children,
  className,
  ...rest
}: RadioGroupProps) {
  const hasError = hasFieldMessage(errorMessage);
  return (
    <AriaRadioGroup
      {...rest} isInvalid={rest.isInvalid ?? (hasError ? true : undefined)}
      orientation={orientation}
      className={cn('dhk-control-group', className)}
    >
      {label != null && <Label className="dhk-control-label">{label}</Label>}
      <div className="dhk-control-group__items">{children}</div>
      {description != null && !hasError && (
        <Text slot="description" className="dhk-control-desc">{description}</Text>
      )}
      <FieldError className="dhk-control-error">{hasError ? errorMessage : undefined}</FieldError>
    </AriaRadioGroup>
  );
}
