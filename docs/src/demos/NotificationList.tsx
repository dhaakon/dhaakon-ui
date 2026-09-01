import { NotificationList } from '@dhaakon/ui/app';
import { Button } from '@dhaakon/ui';

export default function Demo() {
  return (
    <NotificationList
      items={[
        { id: '1', title: 'Build failed', body: 'tsc reported 3 errors in Table.tsx.', time: '4m', unread: true,
          actions: <><Button size="sm" variant="outline">Logs</Button><Button size="sm">Retry</Button></> },
        { id: '2', title: 'Memory pressure', body: '21 GiB of 30 GiB in use.', time: '1h', unread: true },
        { id: '3', title: 'Deploy complete', body: 'dhaakon-ui is healthy on :21762.', time: 'Yesterday' },
      ]}
    />
  );
}
