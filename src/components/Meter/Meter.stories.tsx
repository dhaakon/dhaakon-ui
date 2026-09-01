import type { Meta, StoryObj } from '@storybook/react-vite';
import { Meter } from './Meter';

const meta: Meta<typeof Meter> = {
  title: 'Components/Meter',
  component: Meter,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { label: 'Disk usage', value: 19 },
};
export default meta;
type Story = StoryObj<typeof Meter>;

export const Playground: Story = {
  render: (a) => <div style={{ width: 380 }}><Meter {...a} /></div>,
};

export const Levels: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.25rem', width: 380 }}>
      <Meter label="Disk" value={19} />
      <Meter label="Memory" value={78} />
      <Meter label="Inodes" value={94} />
    </div>
  ),
};

export const Formatted: Story = {
  render: () => (
    <div style={{ width: 380 }}>
      <Meter label="Storage" value={86} maxValue={465}
        formatOptions={{ style: 'unit', unit: 'gigabyte' }} warnAt={0.7} criticalAt={0.85} />
    </div>
  ),
};
