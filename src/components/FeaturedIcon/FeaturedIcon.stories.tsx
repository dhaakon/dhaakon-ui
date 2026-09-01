import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeaturedIcon } from './FeaturedIcon';
import { AlertTriangleIcon, CheckCircleIcon, InfoIcon, SearchIcon } from '../../lib/icons';

const meta: Meta<typeof FeaturedIcon> = {
  title: 'Components/FeaturedIcon',
  component: FeaturedIcon,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { children: <SearchIcon /> },
};
export default meta;
type Story = StoryObj<typeof FeaturedIcon>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <FeaturedIcon><InfoIcon /></FeaturedIcon>
      <FeaturedIcon tone="accent"><InfoIcon /></FeaturedIcon>
      <FeaturedIcon tone="success"><CheckCircleIcon /></FeaturedIcon>
      <FeaturedIcon tone="warning"><AlertTriangleIcon /></FeaturedIcon>
      <FeaturedIcon tone="danger"><AlertTriangleIcon /></FeaturedIcon>
    </div>
  ),
};

export const Solid: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <FeaturedIcon solid><InfoIcon /></FeaturedIcon>
      <FeaturedIcon solid tone="accent"><InfoIcon /></FeaturedIcon>
    </div>
  ),
};

export const SizesAndShape: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <FeaturedIcon size="sm"><SearchIcon /></FeaturedIcon>
      <FeaturedIcon size="md"><SearchIcon /></FeaturedIcon>
      <FeaturedIcon size="lg"><SearchIcon /></FeaturedIcon>
      <FeaturedIcon size="lg" circle tone="accent"><SearchIcon /></FeaturedIcon>
    </div>
  ),
};
