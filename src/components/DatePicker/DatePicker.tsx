import { type ReactNode } from 'react';
import {
  DatePicker as AriaDatePicker,
  DateRangePicker as AriaDateRangePicker,
  Group,
  Button as AriaButton,
  Popover,
  Dialog,
  type DatePickerProps as AriaDatePickerProps,
  type DateRangePickerProps as AriaDateRangePickerProps,
  type DateValue,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { CalendarIcon } from '../../lib/icons';
import { Segments } from '../DateField/DateField';
import { Calendar, RangeCalendar } from '../Calendar/Calendar';

export interface DatePickerProps<T extends DateValue>
  extends Omit<AriaDatePickerProps<T>, 'children' | 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  className?: string;
}

/**
 * A segmented date input with a calendar popover.
 *
 * Both routes stay open: type the date directly, or pick it. That matters —
 * a calendar-only control is slow for a date you already know.
 */
export function DatePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  className,
  ...rest
}: DatePickerProps<T>) {
  return (
    <AriaDatePicker {...rest} className={cn('dhk-datefield', className)}>
      {label != null && <span className="dhk-control-label">{label}</span>}
      <Group className="dhk-datefield__box">
        <Segments />
        <AriaButton className="dhk-field-trigger" aria-label="Open calendar">
          <CalendarIcon />
        </AriaButton>
      </Group>
      {description != null && errorMessage == null && (
        <span className="dhk-control-desc">{description}</span>
      )}
      {errorMessage != null && (
        <span className="dhk-control-error" role="alert">{errorMessage}</span>
      )}
      <Popover className="dhk-popover">
        <Dialog>
          <Calendar />
        </Dialog>
      </Popover>
    </AriaDatePicker>
  );
}

export interface DateRangePickerProps<T extends DateValue>
  extends Omit<AriaDateRangePickerProps<T>, 'children' | 'className'> {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  className?: string;
}

/** Start and end dates in one control, backed by a two-ended calendar. */
export function DateRangePicker<T extends DateValue>({
  label,
  description,
  errorMessage,
  className,
  ...rest
}: DateRangePickerProps<T>) {
  return (
    <AriaDateRangePicker {...rest} className={cn('dhk-datefield', className)}>
      {label != null && <span className="dhk-control-label">{label}</span>}
      <Group className="dhk-datefield__box">
        <Segments slot="start" />
        <span aria-hidden className="dhk-daterange__sep">–</span>
        <Segments slot="end" />
        <AriaButton className="dhk-field-trigger" aria-label="Open calendar">
          <CalendarIcon />
        </AriaButton>
      </Group>
      {description != null && errorMessage == null && (
        <span className="dhk-control-desc">{description}</span>
      )}
      {errorMessage != null && (
        <span className="dhk-control-error" role="alert">{errorMessage}</span>
      )}
      <Popover className="dhk-popover">
        <Dialog>
          <RangeCalendar />
        </Dialog>
      </Popover>
    </AriaDateRangePicker>
  );
}
