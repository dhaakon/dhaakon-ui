import { type ReactNode } from 'react';
import {
  NumberField as AriaNumberField,
  Group,
  Input as AriaInput,
  Button as AriaButton,
  type NumberFieldProps as AriaNumberFieldProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';

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
  return (
    <AriaNumberField {...rest} className={cn('dhk-field', className)}>
      {label != null && <span className="dhk-control-label">{label}</span>}
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
      {description != null && errorMessage == null && (
        <span className="dhk-control-desc">{description}</span>
      )}
      {errorMessage != null && (
        <span className="dhk-control-error" role="alert">{errorMessage}</span>
      )}
    </AriaNumberField>
  );
}
