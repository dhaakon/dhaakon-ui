import { type ReactNode } from 'react';
import {
  Label,
  Text,
  FieldError,
  DateField as AriaDateField,
  TimeField as AriaTimeField,
  DateInput,
  DateSegment,
  type DateFieldProps as AriaDateFieldProps,
  type TimeFieldProps as AriaTimeFieldProps,
  type DateValue,
  type TimeValue,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { hasFieldMessage } from '../../lib/fieldMessage';

/**
 * The segmented `<DateInput>` body, shared by DateField, TimeField and the
 * pickers. Inside a DateRangePicker each half must declare which end it is,
 * so `slot` is required there.
 */
export function Segments({ className, slot }: { className?: string; slot?: 'start' | 'end' }) {
  return (
    <DateInput slot={slot} className={cn('dhk-dateinput', className)}>
      {(segment) => <DateSegment segment={segment} className="dhk-datesegment" />}
    </DateInput>
  );
}

export interface DateFieldProps<T extends DateValue>
  extends Omit<AriaDateFieldProps<T>, 'children' | 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  className?: string;
}

/**
 * A date typed segment by segment — no popover.
 *
 * Segment order and separators follow the user's locale, arrow keys increment
 * the focused part, and the whole thing is announced as one value. Values are
 * `@internationalized/date` objects (`parseDate('2026-09-01')`), not JS `Date`,
 * because a calendar date has no timezone.
 */
export function DateField<T extends DateValue>({
  label,
  description,
  errorMessage,
  className,
  ...rest
}: DateFieldProps<T>) {
  const hasError = hasFieldMessage(errorMessage);
  return (
    <AriaDateField {...rest} isInvalid={rest.isInvalid ?? (hasError ? true : undefined)} className={cn('dhk-datefield', className)}>
      {label != null && <Label className="dhk-control-label">{label}</Label>}
      <div className="dhk-datefield__box">
        <Segments />
      </div>
      {description != null && !hasError && (
        <Text slot="description" className="dhk-control-desc">{description}</Text>
      )}
      <FieldError className="dhk-control-error">{hasError ? errorMessage : undefined}</FieldError>
    </AriaDateField>
  );
}

export interface TimeFieldProps<T extends TimeValue>
  extends Omit<AriaTimeFieldProps<T>, 'children' | 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  className?: string;
}

/** The same segmented treatment for a time of day. 12/24-hour follows the locale. */
export function TimeField<T extends TimeValue>({
  label,
  description,
  errorMessage,
  className,
  ...rest
}: TimeFieldProps<T>) {
  const hasError = hasFieldMessage(errorMessage);
  return (
    <AriaTimeField {...rest} isInvalid={rest.isInvalid ?? (hasError ? true : undefined)} className={cn('dhk-datefield', className)}>
      {label != null && <Label className="dhk-control-label">{label}</Label>}
      <div className="dhk-datefield__box">
        <Segments />
      </div>
      {description != null && !hasError && (
        <Text slot="description" className="dhk-control-desc">{description}</Text>
      )}
      <FieldError className="dhk-control-error">{hasError ? errorMessage : undefined}</FieldError>
    </AriaTimeField>
  );
}
