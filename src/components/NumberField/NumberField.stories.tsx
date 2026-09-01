import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberField } from './NumberField';

const meta: Meta<typeof NumberField> = {
  title: 'Components/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { label: 'Replicas', defaultValue: 3, minValue: 1, maxValue: 8 },
};
export default meta;
type Story = StoryObj<typeof NumberField>;

export const Playground: Story = {
  render: (a) => <div style={{ maxWidth: 240 }}><NumberField {...a} /></div>,
};

export const Formatted: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.25rem', maxWidth: 240 }}>
      <NumberField label="CPU quota" defaultValue={0.5} minValue={0} maxValue={1} step={0.05}
        formatOptions={{ style: 'percent' }} />
      <NumberField label="Memory limit" defaultValue={512} step={128}
        formatOptions={{ style: 'unit', unit: 'megabyte' }} />
      <NumberField label="Monthly cost" defaultValue={35}
        formatOptions={{ style: 'currency', currency: 'USD' }} />
    </div>
  ),
};

export const NoSteppers: Story = {
  args: { hideSteppers: true, label: 'Port' , defaultValue: 21762, minValue: 1, maxValue: 65535 },
  render: (a) => <div style={{ maxWidth: 240 }}><NumberField {...a} /></div>,
};

export const Invalid: Story = {
  args: { isInvalid: true, errorMessage: 'Between 1 and 8.', defaultValue: 12 },
  render: (a) => <div style={{ maxWidth: 240 }}><NumberField {...a} /></div>,
};
