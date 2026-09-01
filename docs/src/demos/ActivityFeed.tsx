import { ActivityFeed } from '@dhaakon/ui/app';
import { Avatar, FeaturedIcon } from '@dhaakon/ui';

export default function Demo() {
  return (
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
      ]}
    />
  );
}
