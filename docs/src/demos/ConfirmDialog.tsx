import { ConfirmDialog } from '@dhaakon/ui/app';
import { Button } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <ConfirmDialog
        trigger={<Button variant="outline">Restart service</Button>}
        title="Restart brain?"
        description="In-flight requests will be dropped."
        confirmLabel="Restart"
        destructive={false}
      />
      {/* confirmText gates the button until the phrase is typed exactly. */}
      <ConfirmDialog
        trigger={<Button variant="accent">Drop volume</Button>}
        title="Drop postgres-data?"
        description="The volume and everything in it is removed."
        warning="There is no snapshot of this volume."
        confirmText="postgres-data"
        confirmLabel="Drop volume"
      />
    </div>
  );
}
