import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { label: 'Find a container', placeholder: 'Search 43 containers' },
};
export default meta;
type Story = StoryObj<typeof SearchField>;

export const Playground: Story = {
  render: (a) => <div style={{ maxWidth: 320 }}><SearchField {...a} /></div>,
};

export const WithValue: Story = {
  args: { defaultValue: 'postgres', description: 'Escape clears the field.' },
  render: (a) => <div style={{ maxWidth: 320 }}><SearchField {...a} /></div>,
};

export const NoLabel: Story = {
  args: { label: undefined, 'aria-label': 'Search services' },
  render: (a) => <div style={{ maxWidth: 320 }}><SearchField {...a} /></div>,
};
