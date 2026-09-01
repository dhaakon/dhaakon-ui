import { useMemo, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { SortDescriptor } from 'react-aria-components';
import { DataTable, DataTableHeader, DataTableBody, DataColumn, DataRow, DataCell, SelectionColumn } from './DataTable';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof DataTable> = {
  title: 'Components/DataTable',
  component: DataTable,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof DataTable>;

interface Row { id: string; name: string; port: number; mem: number; status: 'running' | 'stopped' }

const ROWS: Row[] = [
  { id: '1', name: 'brain', port: 21700, mem: 104, status: 'running' },
  { id: '2', name: 'gitserver', port: 21724, mem: 695, status: 'running' },
  { id: '3', name: 'zulip', port: 21726, mem: 4300, status: 'running' },
  { id: '4', name: 'openproject', port: 21725, mem: 1900, status: 'stopped' },
  { id: '5', name: 'grafana', port: 21731, mem: 272, status: 'running' },
];

export const Sortable: Story = {
  render: function Sortable() {
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
              <DataCell>
                <Badge tone={r.status === 'running' ? 'success' : 'danger'} dot>{r.status}</Badge>
              </DataCell>
            </DataRow>
          ))}
        </DataTableBody>
      </DataTable>
    );
  },
};

export const Selectable: Story = {
  render: () => (
    <DataTable aria-label="Services" selectionMode="multiple" defaultSelectedKeys={['2', '3']}>
      <DataTableHeader>
        <SelectionColumn />
        <DataColumn id="name" isRowHeader>Service</DataColumn>
        <DataColumn id="port" numeric>Port</DataColumn>
      </DataTableHeader>
      <DataTableBody>
        {ROWS.map((r) => (
          <DataRow key={r.id} id={r.id} selectable>
            <DataCell>{r.name}</DataCell>
            <DataCell numeric>{r.port}</DataCell>
          </DataRow>
        ))}
      </DataTableBody>
    </DataTable>
  ),
};

export const Empty: Story = {
  render: () => (
    <DataTable aria-label="Services">
      <DataTableHeader>
        <DataColumn id="name" isRowHeader>Service</DataColumn>
        <DataColumn id="port" numeric>Port</DataColumn>
      </DataTableHeader>
      <DataTableBody emptyText="No services match this filter.">{[]}</DataTableBody>
    </DataTable>
  ),
};
