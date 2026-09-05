import { type ReactNode } from 'react';
import {
  Label,
  Text,
  FieldError,
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
import { hasFieldMessage } from '../../lib/fieldMessage';
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
  const hasError = hasFieldMessage(errorMessage);
  return (
    <AriaDatePicker {...rest} isInvalid={rest.isInvalid ?? (hasError ? true : undefined)} className={cn('dhk-datefield', className)}>
      {label != null && <Label className="dhk-control-label">{label}</Label>}
      <Group className="dhk-datefield__box">
        <Segments />
        <AriaButton className="dhk-field-trigger" aria-label="Open calendar">
          <CalendarIcon />
        </AriaButton>
      </Group>
      {description != null && !hasError && (
        <Text slot="description" className="dhk-control-desc">{description}</Text>
      )}
      <FieldError className="dhk-control-error">{hasError ? errorMessage : undefined}</FieldError>
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
  const hasError = hasFieldMessage(errorMessage);
  return (
    <AriaDateRangePicker {...rest} isInvalid={rest.isInvalid ?? (hasError ? true : undefined)} className={cn('dhk-datefield', className)}>
      {label != null && <Label className="dhk-control-label">{label}</Label>}
      <Group className="dhk-datefield__box">
        <Segments slot="start" />
        <span aria-hidden className="dhk-daterange__sep">–</span>
        <Segments slot="end" />
        <AriaButton className="dhk-field-trigger" aria-label="Open calendar">
          <CalendarIcon />
        </AriaButton>
      </Group>
      {description != null && !hasError && (
        <Text slot="description" className="dhk-control-desc">{description}</Text>
      )}
      <FieldError className="dhk-control-error">{hasError ? errorMessage : undefined}</FieldError>
      <Popover className="dhk-popover">
        <Dialog>
          <RangeCalendar />
        </Dialog>
      </Popover>
    </AriaDateRangePicker>
  );
}
