import { useState } from 'react';
import { TreeView } from '@dhaakon/ui/app';

const NODES = [
  { id: 'src', label: 'src', meta: '18 files', children: [
    { id: 'components', label: 'components', children: [
      { id: 'button', label: 'Button.tsx', meta: '1.4 kB' },
      { id: 'select', label: 'Select.tsx', meta: '3.1 kB' },
    ] },
    { id: 'app', label: 'app', children: [{ id: 'shell', label: 'AppShell.tsx', meta: '1.1 kB' }] },
    { id: 'index', label: 'index.ts', meta: '4.2 kB' },
  ] },
  { id: 'docs', label: 'docs', meta: '61 pages' },
  { id: 'readme', label: 'README.md', meta: '9 kB' },
];

export default function Demo() {
  const [sel, setSel] = useState<string | null>('select');
  return (
    <div style={{ maxWidth: 340, border: '1px solid var(--dhk-border)', padding: '0.5rem' }}>
      <TreeView
        label="Repository files"
        nodes={NODES}
        defaultExpandedIds={['src', 'components']}
        selectedId={sel}
        onSelect={setSel}
      />
    </div>
  );
}
