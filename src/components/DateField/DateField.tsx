import { type ReactNode } from 'react';
import {
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
  return (
    <AriaDateField {...rest} className={cn('dhk-datefield', className)}>
      {label != null && <span className="dhk-control-label">{label}</span>}
      <div className="dhk-datefield__box">
        <Segments />
      </div>
      {description != null && errorMessage == null && (
        <span className="dhk-control-desc">{description}</span>
      )}
      {errorMessage != null && (
        <span className="dhk-control-error" role="alert">{errorMessage}</span>
      )}
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
  return (
    <AriaTimeField {...rest} className={cn('dhk-datefield', className)}>
      {label != null && <span className="dhk-control-label">{label}</span>}
      <div className="dhk-datefield__box">
        <Segments />
      </div>
      {description != null && errorMessage == null && (
        <span className="dhk-control-desc">{description}</span>
      )}
      {errorMessage != null && (
        <span className="dhk-control-error" role="alert">{errorMessage}</span>
      )}
    </AriaTimeField>
  );
}
