import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { DropZone, FileTrigger } from './FileInput';
import { Button } from '../Button/Button';
import { FeaturedIcon } from '../FeaturedIcon/FeaturedIcon';
import { UploadIcon } from '../../lib/icons';

const meta: Meta<typeof DropZone> = {
  title: 'Components/FileInput',
  component: DropZone,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof DropZone>;

export const Trigger: Story = {
  render: function Trigger() {
    const [names, setNames] = useState<string[]>([]);
    return (
      <div style={{ display: 'grid', gap: '0.75rem' }}>
        <FileTrigger allowsMultiple onSelect={(fl) => setNames([...(fl ?? [])].map((f) => f.name))}>
          <Button variant="outline" iconStart={<UploadIcon />}>Choose files…</Button>
        </FileTrigger>
        {names.length > 0 && (
          <span className="dhk-mono" style={{ color: 'var(--dhk-text-muted)' }}>{names.join(', ')}</span>
        )}
      </div>
    );
  },
};

export const Zone: Story = {
  render: function Zone() {
    const [count, setCount] = useState(0);
    return (
      <div style={{ maxWidth: 520 }}>
        <DropZone
          label="Drop container logs here"
          hint=".log or .txt, up to 20 MB"
          onDrop={(e) => setCount(e.items.filter((i) => i.kind === 'file').length)}
        >
          <FeaturedIcon size="lg"><UploadIcon /></FeaturedIcon>
          <FileTrigger allowsMultiple onSelect={(fl) => setCount(fl ? [...fl].length : 0)}>
            <Button variant="outline" size="sm">Browse…</Button>
          </FileTrigger>
          {count > 0 && <span className="dhk-mono">{count} file(s) received</span>}
        </DropZone>
      </div>
    );
  },
};
