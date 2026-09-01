import { useMemo, useState } from 'react';
import type { SortDescriptor } from 'react-aria-components';
import { Badge, DataCell, DataColumn, DataRow, DataTable, DataTableBody, DataTableHeader } from '@dhaakon/ui';

interface Row { id: string; name: string; port: number; mem: number; status: 'running' | 'stopped' }

const ROWS: Row[] = [
  { id: '1', name: 'brain', port: 21700, mem: 104, status: 'running' },
  { id: '2', name: 'gitserver', port: 21724, mem: 695, status: 'running' },
  { id: '3', name: 'zulip', port: 21726, mem: 4300, status: 'running' },
  { id: '4', name: 'openproject', port: 21725, mem: 1900, status: 'stopped' },
];

export default function Demo() {
  const [sort, setSort] = useState<SortDescriptor>({ column: 'mem', direction: 'descending' });
  const rows = useMemo(() => {
    const c = sort.column as keyof Row;
    return [...ROWS].sort((a, b) => {
      const r = a[c] < b[c] ? -1 : a[c] > b[c] ? 1 : 0;
      return sort.direction === 'descending' ? -r : r;
    });
  }, [sort]);

  return (
    <DataTable aria-label="Services" sortDescriptor={sort} onSortChange={setSort}>
      <DataTableHeader>
        <DataColumn id="name" isRowHeader allowsSorting>Service</DataColumn>
        <DataColumn id="port" allowsSorting numeric>Port</DataColumn>
        <DataColumn id="mem" allowsSorting numeric>Memory (MiB)</DataColumn>
        <DataColumn id="status">Status</DataColumn>
      </DataTableHeader>
      <DataTableBody>
        {rows.map((r) => (
          <DataRow key={r.id} id={r.id}>
            <DataCell>{r.name}</DataCell>
            <DataCell numeric>{r.port}</DataCell>
            <DataCell numeric>{r.mem.toLocaleString()}</DataCell>
            <DataCell><Badge tone={r.status === 'running' ? 'success' : 'danger'} dot>{r.status}</Badge></DataCell>
          </DataRow>
        ))}
      </DataTableBody>
    </DataTable>
  );
}
