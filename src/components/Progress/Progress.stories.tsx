import type { Meta, StoryObj } from '@storybook/react-vite';
import { Progress, ProgressRing } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { label: 'Disk usage', value: 19 },
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Playground: Story = { render: (a) => <div style={{ width: 380 }}><Progress {...a} /></div> };

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: 380 }}>
      <Progress label="Disk" value={19} />
      <Progress label="Memory" value={71} tone="warning" />
      <Progress label="Swap" value={0.1} tone="success" />
      <Progress label="Inodes" value={94} tone="danger" />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => <div style={{ width: 380 }}><Progress label="Pulling image" isIndeterminate /></div>,
};

export const Formatted: Story = {
  render: () => (
    <div style={{ width: 380 }}>
      <Progress label="Transferred" value={412} maxValue={1024} formatOptions={{ style: 'unit', unit: 'megabyte' }} />
    </div>
  ),
};

export const Rings: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <ProgressRing aria-label="CPU" value={18} />
      <ProgressRing aria-label="Memory" value={71} tone="accent" />
      <ProgressRing aria-label="Disk" value={94} tone="danger" size={72} thickness={6} />
    </div>
  ),
};
