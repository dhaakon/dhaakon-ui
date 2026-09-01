import { useMemo, useState } from 'react';
import { DataGrid, FilterBar, PaginationBar } from '@dhaakon/ui/app';
import {
  Badge, Button, DataCell, DataColumn, DataRow, DataTable, DataTableBody, DataTableHeader,
  EmptyState, FeaturedIcon, SearchField, Select, SelectItem,
} from '@dhaakon/ui';

const ALL = [
  { id: '1', name: 'brain', port: 21700, mem: 104, status: 'running' },
  { id: '2', name: 'gitserver', port: 21724, mem: 695, status: 'running' },
  { id: '3', name: 'zulip', port: 21726, mem: 4300, status: 'running' },
  { id: '4', name: 'openproject', port: 21725, mem: 1900, status: 'stopped' },
  { id: '5', name: 'grafana', port: 21731, mem: 272, status: 'running' },
];

export default function Demo() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const rows = useMemo(
    () => ALL.filter((r) => r.name.includes(query.toLowerCase()) && (status == null || r.status === status)),
    [query, status],
  );

  return (
    <DataGrid
      isEmpty={rows.length === 0}
      toolbar={
        <FilterBar
          search={<SearchField aria-label="Search services" placeholder="Search services" value={query} onChange={setQuery} />}
          filters={
            <div style={{ minWidth: 160 }}>
              <Select aria-label="Status" placeholder="Any status" selectedKey={status}
                onSelectionChange={(k) => setStatus(k as string)}>
                <SelectItem id="running">running</SelectItem>
                <SelectItem id="stopped">stopped</SelectItem>
              </Select>
            </div>
          }
          end={<Button variant="outline" size="sm">Export</Button>}
          applied={status ? [{ id: 'status', label: `status: ${status}` }] : []}
          onRemoveFilter={() => setStatus(null)}
          onClearAll={() => { setStatus(null); setQuery(''); }}
          resultCount={`${rows.length} of ${ALL.length}`}
        />
      }
      empty={
        <EmptyState
          icon={<FeaturedIcon size="lg">⌕</FeaturedIcon>}
          title="No services match"
          description="Nothing here matches the current search and filters."
          actions={<Button variant="outline" onClick={() => { setStatus(null); setQuery(''); }}>Clear filters</Button>}
        />
      }
      pagination={
        <PaginationBar page={page} pageCount={Math.max(1, Math.ceil(rows.length / pageSize))}
          onPageChange={setPage} pageSize={pageSize} onPageSizeChange={setPageSize}
          totalItems={rows.length} itemNoun="services" />
      }
    >
      <DataTable aria-label="Services" selectionMode="multiple">
        <DataTableHeader>
          <DataColumn id="name" isRowHeader>Service</DataColumn>
          <DataColumn id="port" numeric>Port</DataColumn>
          <DataColumn id="mem" numeric>Memory (MiB)</DataColumn>
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
    </DataGrid>
  );
}
