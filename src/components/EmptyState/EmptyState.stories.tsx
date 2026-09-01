import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';
import { FeaturedIcon } from '../FeaturedIcon/FeaturedIcon';
import { Button } from '../Button/Button';
import { SearchIcon, AlertTriangleIcon } from '../../lib/icons';

const meta: Meta<typeof EmptyState> = {
  title: 'Components/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Basic: Story = {
  args: {
    icon: <FeaturedIcon size="lg"><SearchIcon /></FeaturedIcon>,
    title: 'No containers match',
    description: 'Nothing in the dhaakon-network stack matches "postgres-16-beta". Try a shorter query.',
    actions: <Button variant="outline">Clear filter</Button>,
  },
};

export const FirstRun: Story = {
  args: {
    icon: <FeaturedIcon size="lg" tone="accent" solid><SearchIcon /></FeaturedIcon>,
    title: 'No teams yet',
    description: 'A team gets its own Gitea org, Zulip stream and project board.',
    actions: (
      <>
        <Button variant="outline">Import from Gitea</Button>
        <Button>Create a team</Button>
      </>
    ),
  },
};

export const ErrorState: Story = {
  args: {
    icon: <FeaturedIcon size="lg" tone="danger"><AlertTriangleIcon /></FeaturedIcon>,
    title: 'Could not reach the Brain API',
    description: 'http://brain:21700 did not respond within 3s.',
    actions: <Button>Retry</Button>,
  },
};
