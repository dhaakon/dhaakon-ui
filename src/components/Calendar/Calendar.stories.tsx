import type { Meta, StoryObj } from '@storybook/react-vite';
import { parseDate, isWeekend } from '@internationalized/date';
import { Calendar, RangeCalendar } from './Calendar';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar as never,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => <Calendar aria-label="Deploy date" defaultValue={parseDate('2026-09-01')} />,
};

export const Range: Story = {
  render: () => (
    <RangeCalendar
      aria-label="Maintenance window"
      defaultValue={{ start: parseDate('2026-09-08'), end: parseDate('2026-09-12') }}
    />
  ),
};

export const WeekendsUnavailable: Story = {
  render: () => (
    <Calendar
      aria-label="Deploy date"
      defaultValue={parseDate('2026-09-01')}
      minValue={parseDate('2026-09-01')}
      isDateUnavailable={(d) => isWeekend(d, 'en-US')}
      errorMessage="Deploys do not run at the weekend."
    />
  ),
};
