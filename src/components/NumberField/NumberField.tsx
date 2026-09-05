import { type ReactNode } from 'react';
import {
  Label,
  Text,
  FieldError,
  NumberField as AriaNumberField,
  Group,
  Input as AriaInput,
  Button as AriaButton,
  type NumberFieldProps as AriaNumberFieldProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { hasFieldMessage } from '../../lib/fieldMessage';

export interface NumberFieldProps extends Omit<AriaNumberFieldProps, 'children' | 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  /** Hide the +/− steppers; arrow keys and scroll still work. */
  hideSteppers?: boolean;
  className?: string;
}

/**
 * A numeric input with steppers, clamping and locale-aware formatting.
 *
 * Prefer this to `<Input type="number">`: it parses what the user's locale
 * actually types (grouping separators, decimal commas), clamps to
 * `minValue`/`maxValue`, and exposes the value as a real number rather than a
 * string. `formatOptions` takes `Intl.NumberFormat` options for units,
 * currency and percent.
 */
export function NumberField({
  label,
  description,
  errorMessage,
  hideSteppers,
  className,
  ...rest
}: NumberFieldProps) {
  const hasError = hasFieldMessage(errorMessage);
  return (
    <AriaNumberField {...rest} isInvalid={rest.isInvalid ?? (hasError ? true : undefined)} className={cn('dhk-field', className)}>
      {label != null && <Label className="dhk-control-label">{label}</Label>}
      <Group className="dhk-numberfield__box">
        {!hideSteppers && (
          <AriaButton slot="decrement" className="dhk-numberfield__step" aria-label="Decrease">
            −
          </AriaButton>
        )}
        <AriaInput />
        {!hideSteppers && (
          <AriaButton slot="increment" className="dhk-numberfield__step" aria-label="Increase">
            +
          </AriaButton>
        )}
      </Group>
      {description != null && !hasError && (
        <Text slot="description" className="dhk-control-desc">{description}</Text>
      )}
      <FieldError className="dhk-control-error">{hasError ? errorMessage : undefined}</FieldError>
    </AriaNumberField>
  );
}
