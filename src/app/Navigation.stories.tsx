import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TreeView } from './TreeView';
import { CommandMenu } from './CommandMenu';
import { Button } from '../components/Button/Button';

const meta: Meta = {
  title: 'Composites/Navigation',
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

const NODES = [
  {
    id: 'src', label: 'src', meta: '18 files',
    children: [
      { id: 'components', label: 'components', children: [
        { id: 'button', label: 'Button.tsx', meta: '1.4 kB' },
        { id: 'select', label: 'Select.tsx', meta: '3.1 kB' },
      ] },
      { id: 'app', label: 'app', children: [{ id: 'shell', label: 'AppShell.tsx', meta: '1.1 kB' }] },
      { id: 'index', label: 'index.ts', meta: '4.2 kB' },
    ],
  },
  { id: 'docs', label: 'docs', meta: '39 pages', children: [{ id: 'reg', label: 'registry.ts', meta: '12 kB' }] },
  { id: 'readme', label: 'README.md', meta: '9 kB' },
];

export const Tree: Story = {
  render: function Tree() {
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
  },
};

export const Command: Story = {
  render: function Command() {
    const [open, setOpen] = useState(false);
    return (
      <div style={{ height: 420 }}>
        <Button variant="outline" onClick={() => setOpen(true)}>Open command menu (⌘K)</Button>
        <CommandMenu
          isOpen={open}
          onOpenChange={setOpen}
          commands={[
            { id: 'dash', group: 'Navigate', label: 'Go to dashboard', shortcut: 'G D' },
            { id: 'svc', group: 'Navigate', label: 'Go to container service', shortcut: 'G C' },
            { id: 'teams', group: 'Navigate', label: 'Go to teams', shortcut: 'G T' },
            { id: 'restart', group: 'Actions', label: 'Restart a container' },
            { id: 'deploy', group: 'Actions', label: 'Redeploy dhaakon-ui' },
            { id: 'theme', group: 'Preferences', label: 'Toggle dark mode' },
          ]}
        />
      </div>
    );
  },
};

/** Rendered open so the palette can be seen without interacting. */
export const CommandOpen: Story = {
  render: () => (
    <div style={{ height: 460 }}>
      <CommandMenu
        isOpen
        hotkey={false}
        commands={[
          { id: 'dash', group: 'Navigate', label: 'Go to dashboard', shortcut: 'G D' },
          { id: 'svc', group: 'Navigate', label: 'Go to container service', shortcut: 'G C' },
          { id: 'restart', group: 'Actions', label: 'Restart a container' },
          { id: 'theme', group: 'Preferences', label: 'Toggle dark mode' },
        ]}
      />
    </div>
  ),
};
