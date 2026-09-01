import type { Meta, StoryObj } from '@storybook/react-vite';
import { ActivityFeed } from './ActivityFeed';
import { NotificationList } from './NotificationList';
import { ProgressSteps } from './ProgressSteps';
import { Avatar } from '../components/Avatar/Avatar';
import { FeaturedIcon } from '../components/FeaturedIcon/FeaturedIcon';
import { Button } from '../components/Button/Button';

const meta: Meta = {
  title: 'Composites/Feed & Steps',
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

export const Activity: Story = {
  render: () => (
    <div style={{ maxWidth: 620 }}>
      <ActivityFeed
        items={[
          { id: 1, marker: <Avatar name="David Poyner" size="sm" />, actor: 'dhaakon-ubuntu',
            action: 'published', target: <code className="dhk-mono">@dhaakon/ui@0.4.0</code>, time: '2m ago',
            detail: '25 application composites added under @dhaakon/ui/app.' },
          { id: 2, marker: <FeaturedIcon size="sm" tone="success">✓</FeaturedIcon>, actor: 'CI',
            action: 'deployed', target: 'dhaakon-ui-docs', time: '14m ago' },
          { id: 3, marker: <FeaturedIcon size="sm" tone="danger">!</FeaturedIcon>, actor: 'openproject',
            action: 'failed a health check', time: '1h ago',
            detail: 'GET /health_checks/default timed out after 3s, three times running.' },
          { id: 4, marker: <Avatar name="Agent 7c03" size="sm" />, actor: 'agent-7c034b0e',
            action: 'opened', target: 'briar-the-planner-app#12', time: '3h ago' },
        ]}
      />
    </div>
  ),
};

export const Notifications: Story = {
  render: () => (
    <div style={{ maxWidth: 520 }}>
      <NotificationList
        items={[
          { id: '1', title: 'Build failed', body: 'tsc reported 3 errors in Table.tsx.', time: '4m',
            unread: true, actions: <><Button size="sm" variant="outline">Logs</Button><Button size="sm">Retry</Button></> },
          { id: '2', title: 'Memory pressure', body: '21 GiB of 30 GiB in use.', time: '1h', unread: true },
          { id: '3', title: 'Deploy complete', body: 'dhaakon-ui is healthy on :21762.', time: 'Yesterday' },
        ]}
      />
    </div>
  ),
};

export const Steps: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '3rem' }}>
      <ProgressSteps
        current={1}
        steps={[
          { title: 'Listen', description: 'Trace the pipeline as it exists.' },
          { title: 'Build', description: 'Design against live briefs.' },
          { title: 'Practice', description: 'Cohorts work in the open.' },
          { title: 'Transfer', description: 'Champions run the pattern.' },
        ]}
      />
      <div style={{ maxWidth: 320 }}>
        <ProgressSteps
          orientation="vertical"
          current={2}
          steps={[
            { title: 'Pull image' },
            { title: 'Run migrations' },
            { title: 'Start containers', description: 'Waiting on health checks…' },
            { title: 'Swap traffic' },
          ]}
        />
      </div>
    </div>
  ),
};
