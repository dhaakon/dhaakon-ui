import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner, Skeleton } from './Spinner';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner & Skeleton',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Spinners: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
      <Spinner size="sm" />
      <Spinner />
      <Spinner size="lg" />
      <Spinner size="lg" accent />
    </div>
  ),
};

export const SkeletonText: Story = {
  render: () => (
    <div style={{ width: 420 }} aria-busy>
      <Skeleton text lines={4} />
    </div>
  ),
};

export const SkeletonCard: Story = {
  render: () => (
    <div style={{ width: 320, display: 'flex', gap: '0.75rem' }} aria-busy>
      <Skeleton circle width={40} height={40} />
      <div style={{ flex: 1 }}>
        <Skeleton text width="70%" />
        <Skeleton text width="45%" />
      </div>
    </div>
  ),
};
