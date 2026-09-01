import { Progress, ProgressRing } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: 380 }}>
      <Progress label="Disk" value={19} />
      <Progress label="Memory" value={71} tone="warning" />
      <Progress label="Pulling image" isIndeterminate />
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <ProgressRing aria-label="CPU" value={18} />
        <ProgressRing aria-label="Memory" value={71} tone="accent" />
        <ProgressRing aria-label="Disk" value={94} tone="danger" />
      </div>
    </div>
  );
}
