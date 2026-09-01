import { Badge, GridList, GridListAction, GridListItem } from '@dhaakon/ui';

const services = [
  { id: 'brain', name: 'brain', status: 'running' },
  { id: 'gitserver', name: 'gitserver', status: 'running' },
  { id: 'zulip', name: 'zulip', status: 'running' },
  { id: 'openproject', name: 'openproject', status: 'stopped' },
];

export default function Demo() {
  return (
    <div style={{ maxWidth: 480 }}>
      <GridList aria-label="Services" selectionMode="multiple" defaultSelectedKeys={['brain']}>
        {services.map((s) => (
          <GridListItem key={s.id} id={s.id} textValue={s.name}>
            <span>{s.name}</span>
            <Badge tone={s.status === 'running' ? 'success' : 'danger'} dot>{s.status}</Badge>
            <GridListAction aria-label={`Restart ${s.name}`}>Restart</GridListAction>
          </GridListItem>
        ))}
      </GridList>
    </div>
  );
}
