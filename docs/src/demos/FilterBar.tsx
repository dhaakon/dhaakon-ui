import { useState } from 'react';
import { FilterBar } from '@dhaakon/ui/app';
import { Button, SearchField, Select, SelectItem } from '@dhaakon/ui';

export default function Demo() {
  const [query, setQuery] = useState('');
  const [applied, setApplied] = useState([
    { id: 'status', label: 'status: running' },
    { id: 'project', label: 'project: dhaakon-network' },
  ]);

  return (
    <FilterBar
      search={<SearchField aria-label="Search" placeholder="Search services" value={query} onChange={setQuery} />}
      filters={
        <div style={{ minWidth: 160 }}>
          <Select aria-label="Status" placeholder="Any status">
            <SelectItem id="running">running</SelectItem>
            <SelectItem id="stopped">stopped</SelectItem>
          </Select>
        </div>
      }
      end={<Button variant="outline" size="sm">Export</Button>}
      applied={applied}
      onRemoveFilter={(id) => setApplied((p) => p.filter((f) => f.id !== id))}
      onClearAll={() => setApplied([])}
      resultCount="12 of 43"
    />
  );
}
