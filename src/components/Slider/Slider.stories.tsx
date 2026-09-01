import type { Meta, StoryObj } from '@storybook/react-vite';
import { Slider } from './Slider';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider as never,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <Slider label="Memory limit" defaultValue={512} minValue={128} maxValue={4096} step={128} />
    </div>
  ),
};

export const Range: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <Slider<number[]> label="Port range" defaultValue={[21700, 21800]} minValue={21000} maxValue={22000} step={10} />
    </div>
  ),
};

export const Formatted: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <Slider label="CPU quota" defaultValue={0.5} minValue={0} maxValue={1} step={0.05}
        formatOptions={{ style: 'percent' }} />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ width: 340 }}>
      <Slider label="Replicas (locked)" defaultValue={3} minValue={1} maxValue={8} isDisabled />
    </div>
  ),
};
