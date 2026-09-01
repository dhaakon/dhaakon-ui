import type { Meta, StoryObj } from '@storybook/react-vite';
import { parseDate, Time } from '@internationalized/date';
import { DateField, TimeField } from './DateField';

const meta: Meta<typeof DateField> = {
  title: 'Components/DateField',
  component: DateField as never,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <div style={{ maxWidth: 260 }}>
      <DateField label="Start date" defaultValue={parseDate('2026-09-01')} />
    </div>
  ),
};

export const WithConstraints: Story = {
  render: () => (
    <div style={{ maxWidth: 260 }}>
      <DateField
        label="Renewal"
        defaultValue={parseDate('2026-09-01')}
        minValue={parseDate('2026-01-01')}
        description="Must fall inside the current licence year."
      />
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div style={{ maxWidth: 260 }}>
      <DateField label="Start date" isInvalid errorMessage="Pick a date in the future." />
    </div>
  ),
};

export const Time_: Story = {
  name: 'TimeField',
  render: () => (
    <div style={{ display: 'grid', gap: '1.25rem', maxWidth: 260 }}>
      <TimeField label="Window opens" defaultValue={new Time(9, 30)} />
      <TimeField label="Window closes" defaultValue={new Time(17, 0)} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 260 }}>
      <DateField label="Locked" isDisabled defaultValue={parseDate('2026-09-01')} />
    </div>
  ),
};
