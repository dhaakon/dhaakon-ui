import { type ReactNode } from 'react';
import {
  Calendar as AriaCalendar,
  RangeCalendar as AriaRangeCalendar,
  CalendarGrid,
  CalendarGridHeader,
  CalendarHeaderCell,
  CalendarGridBody,
  CalendarCell,
  Button as AriaButton,
  Heading,
  Text,
  type CalendarProps as AriaCalendarProps,
  type RangeCalendarProps as AriaRangeCalendarProps,
  type DateValue,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { ChevronLeftIcon, ChevronRightIcon } from '../../lib/icons';

function Header() {
  return (
    <header className="dhk-calendar__header">
      <AriaButton slot="previous" className="dhk-calendar__nav" aria-label="Previous month">
        <ChevronLeftIcon />
      </AriaButton>
      <Heading className="dhk-calendar__heading" />
      <AriaButton slot="next" className="dhk-calendar__nav" aria-label="Next month">
        <ChevronRightIcon />
      </AriaButton>
    </header>
  );
}

function Grid() {
  return (
    <CalendarGrid className="dhk-calendar__grid">
      <CalendarGridHeader>
        {(day) => <CalendarHeaderCell className="dhk-calendar__weekday">{day}</CalendarHeaderCell>}
      </CalendarGridHeader>
      <CalendarGridBody>
        {(date) => <CalendarCell date={date} className="dhk-calendar__cell" />}
      </CalendarGridBody>
    </CalendarGrid>
  );
}

export interface CalendarProps<T extends DateValue>
  extends Omit<AriaCalendarProps<T>, 'children' | 'className'> {
  errorMessage?: ReactNode;
  className?: string;
}

/**
 * A month grid for picking one date.
 *
 * The first day of the week, month names and reading direction follow the
 * locale; `isDateUnavailable` greys out individual days without disabling the
 * whole control.
 */
export function Calendar<T extends DateValue>({ errorMessage, className, ...rest }: CalendarProps<T>) {
  return (
    <AriaCalendar {...rest} className={cn('dhk-calendar', className)}>
      <Header />
      <Grid />
      {errorMessage != null && (
        <Text slot="errorMessage" className="dhk-calendar__error">{errorMessage}</Text>
      )}
    </AriaCalendar>
  );
}

export interface RangeCalendarProps<T extends DateValue>
  extends Omit<AriaRangeCalendarProps<T>, 'children' | 'className'> {
  errorMessage?: ReactNode;
  className?: string;
}

/** Two-ended selection. The ends take the accent; the span between is filled flat. */
export function RangeCalendar<T extends DateValue>({
  errorMessage,
  className,
  ...rest
}: RangeCalendarProps<T>) {
  return (
    <AriaRangeCalendar {...rest} className={cn('dhk-calendar', 'dhk-calendar--range', className)}>
      <Header />
      <Grid />
      {errorMessage != null && (
        <Text slot="errorMessage" className="dhk-calendar__error">{errorMessage}</Text>
      )}
    </AriaRangeCalendar>
  );
}
