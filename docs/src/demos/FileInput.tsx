import { useState } from 'react';
import { Button, DropZone, FeaturedIcon, FileTrigger } from '@dhaakon/ui';

export default function Demo() {
  const [count, setCount] = useState(0);
  return (
    <div style={{ maxWidth: 520 }}>
      <DropZone
        label="Drop container logs here"
        hint=".log or .txt, up to 20 MB"
        onDrop={(e) => setCount(e.items.filter((i) => i.kind === 'file').length)}
      >
        <FeaturedIcon size="lg">↑</FeaturedIcon>
        <FileTrigger allowsMultiple onSelect={(fl) => setCount(fl ? [...fl].length : 0)}>
          <Button variant="outline" size="sm">Browse…</Button>
        </FileTrigger>
        {count > 0 && <span className="dhk-mono">{count} file(s) received</span>}
      </DropZone>
    </div>
  );
}
