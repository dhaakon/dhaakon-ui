import { Button, useToast } from '@dhaakon/ui';

export default function Demo() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button variant="outline" onClick={() => toast({ title: 'Snapshot recorded', description: 'Local demonstration — no remote write.' })}>
        Neutral
      </Button>
      <Button variant="outline" onClick={() => toast({ tone: 'success', title: 'Sample export complete' })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast({ tone: 'danger', title: 'Sample build failed', duration: 0 })}>
        Sticky danger
      </Button>
    </div>
  );
}
