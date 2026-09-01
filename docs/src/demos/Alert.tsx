import { Alert, Button } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '0.75rem', maxWidth: 560 }}>
      <Alert tone="info" title="Update available">@dhaakon/ui 0.2.0 is on the network registry.</Alert>
      <Alert tone="success" title="Deployed">dhaakon-ui is healthy on :21762.</Alert>
      <Alert tone="warning" title="Memory pressure" onClose={() => {}}>
        21 GiB of 30 GiB in use; 440 MiB free.
      </Alert>
      <Alert
        tone="danger"
        title="Build failed"
        actions={<><Button size="sm" variant="outline">Logs</Button><Button size="sm">Retry</Button></>}
      >
        tsc reported 3 errors in Table.tsx.
      </Alert>
    </div>
  );
}
