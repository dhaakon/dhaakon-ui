import { Badge, Table, type Column } from '@dhaakon/ui';

interface Service { name: string; port: number; status: 'running' | 'stopped'; mem: string }

const rows: Service[] = [
  { name: 'brain', port: 21700, status: 'running', mem: '104 MiB' },
  { name: 'gitserver', port: 21724, status: 'running', mem: '695 MiB' },
  { name: 'zulip', port: 21726, status: 'running', mem: '4.3 GiB' },
  { name: 'openproject', port: 21725, status: 'stopped', mem: '1.9 GiB' },
];

const columns: Column<Service>[] = [
  { key: 'name', header: 'Service' },
  { key: 'port', header: 'Port', numeric: true },
  { key: 'status', header: 'Status', cell: (r) => (
      <Badge tone={r.status === 'running' ? 'success' : 'danger'} dot>{r.status}</Badge>
    ) },
  { key: 'mem', header: 'Memory', numeric: true },
];

export default function Demo() {
  return <Table columns={columns} data={rows} rowKey={(r) => r.name} caption="dhaakon-network services" />;
}
