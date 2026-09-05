import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MultiSelect } from './MultiSelect';

const options = [
  { id: 'vector', label: 'Vector studies', description: 'Deterministic SVG experiments' },
  { id: 'render', label: 'Offline rendering', description: 'Frame-indexed research artifacts' },
  { id: 'network', label: 'Network instruments', description: 'Local homelab interfaces' },
  { id: 'archive', label: 'Archived projects', isDisabled: true },
];

const meta: Meta<typeof MultiSelect> = {
  title: 'Components/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  args: { label: 'Research collections', options },
  decorators: [(Story) => <div style={{ width: 340, maxWidth: '100%' }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof MultiSelect>;

export const Searchable: Story = {
  args: { defaultValue: ['vector'], description: 'Choose one or more collections. Search is accent-insensitive.' },
};

export const Invalid: Story = {
  args: { isRequired: true, errorMessage: 'Choose at least one collection.' },
};

export const Disabled: Story = {
  args: { isDisabled: true, defaultValue: ['render'] },
};

export const Controlled: Story = {
  render: (args) => <ControlledExample {...args} />,
};

function ControlledExample(props: React.ComponentProps<typeof MultiSelect>) {
  const [value, setValue] = useState<string[]>(['vector']);
  return <><MultiSelect {...props} value={value} onChange={setValue} /><p className="dhk-mono">Selected: {value.join(', ') || 'none'}</p></>;
}
