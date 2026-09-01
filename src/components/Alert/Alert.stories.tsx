import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { Button } from '../Button/Button';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { title: 'Container unhealthy', children: 'openproject failed its last 3 health checks.' },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Playground: Story = {};

export const Tones: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: 560 }}>
      <Alert title="Neutral" >Plain informational note.</Alert>
      <Alert tone="info" title="Info">A new @dhaakon/ui version is available.</Alert>
      <Alert tone="success" title="Deployed">dhaakon-ui is healthy on :21762.</Alert>
      <Alert tone="warning" title="Memory pressure">21 GiB of 30 GiB in use; 440 MiB free.</Alert>
      <Alert tone="danger" title="Build failed">tsc reported 3 errors in Table.tsx.</Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  args: { tone: 'info', onClose: () => {} },
};

export const WithActions: Story = {
  args: {
    tone: 'warning',
    title: 'Verdaccio storage was read-only',
    children: 'Publishes failed until the container ran as uid 1001.',
    actions: (
      <>
        <Button size="sm" variant="outline">View logs</Button>
        <Button size="sm">Retry publish</Button>
      </>
    ),
  },
};

export const TitleOnly: Story = { args: { children: undefined } };
