import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card, CardHeader, CardBody, CardFooter } from './Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  argTypes: {
    raised: { control: 'boolean' },
    interactive: { control: 'boolean' },
    flush: { control: 'boolean' },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: 420 }}>
      <CardHeader
        title="brain"
        subtitle="Orchestration API"
        action={<Badge tone="success" dot>Running</Badge>}
      />
      <CardBody>
        <p style={{ margin: 0, color: 'var(--dhk-text-muted)' }}>
          Tasks, teams, workflows and agent dispatch for the dhaakon-network.
        </p>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="outline">Logs</Button>
        <Button size="sm">Open</Button>
      </CardFooter>
    </Card>
  ),
};

export const Raised: Story = { ...Basic, args: { raised: true } };

export const Interactive: Story = {
  args: { interactive: true },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 320 }}>
      <CardBody>
        <div className="dhk-eyebrow" style={{ marginBottom: '0.5rem' }}>App runner</div>
        <div style={{ fontSize: '1.15rem' }}>console</div>
        <div style={{ color: 'var(--dhk-text-subtle)', fontSize: '0.75rem' }}>:5002 · running</div>
      </CardBody>
    </Card>
  ),
};
