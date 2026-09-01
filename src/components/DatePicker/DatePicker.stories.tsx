import type { Meta, StoryObj } from '@storybook/react-vite';
import { parseDate } from '@internationalized/date';
import { DatePicker, DateRangePicker } from './DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker as never,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <div style={{ maxWidth: 300, height: 380 }}>
      <DatePicker label="Deploy on" defaultValue={parseDate('2026-09-01')} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div style={{ maxWidth: 400, height: 420 }}>
      <DateRangePicker
        label="Maintenance window"
        defaultValue={{ start: parseDate('2026-09-08'), end: parseDate('2026-09-12') }}
        description="Both ends are inclusive."
      />
    </div>
  ),
};

export const Open: Story = {
  render: () => (
    <div style={{ maxWidth: 300, height: 420 }}>
      <DatePicker label="Deploy on" defaultOpen defaultValue={parseDate('2026-09-01')} />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div style={{ maxWidth: 300 }}>
      <DatePicker label="Deploy on" isInvalid errorMessage="Choose a weekday." />
    </div>
  ),
};
