import { Meter } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '1.25rem', maxWidth: 380 }}>
      <Meter label="Disk" value={19} />
      <Meter label="Memory" value={78} />
      <Meter label="Inodes" value={94} />
    </div>
  );
}
