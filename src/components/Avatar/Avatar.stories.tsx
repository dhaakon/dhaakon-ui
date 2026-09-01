import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { name: 'David Poyner' },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((s) => (
        <Avatar key={s} size={s} name="David Poyner" />
      ))}
    </div>
  ),
};

export const Square: Story = { args: { square: true, size: 'lg' } };

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.75rem' }}>
      <Avatar name="Agent One" status="online" />
      <Avatar name="Agent Two" status="busy" />
      <Avatar name="Agent Three" status="away" />
      <Avatar name="Agent Four" status="offline" />
    </div>
  ),
};

export const BrokenImageFallsBack: Story = {
  args: { src: 'https://example.invalid/nope.png', name: 'Fallback Person', size: 'lg' },
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={4}>
      {['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Katherine Johnson', 'Edsger Dijkstra', 'Barbara Liskov'].map(
        (n) => <Avatar key={n} name={n} />,
      )}
    </AvatarGroup>
  ),
};
