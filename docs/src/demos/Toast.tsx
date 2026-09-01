import { Button, ToastProvider, useToast } from '@dhaakon/ui';

function Trigger() {
  const { toast } = useToast();
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
      <Button variant="outline" onClick={() => toast({ title: 'Pushed to main', description: 'dhaakon-ui@0.2.0' })}>
        Neutral
      </Button>
      <Button variant="outline" onClick={() => toast({ tone: 'success', title: 'Deploy complete' })}>
        Success
      </Button>
      <Button variant="outline" onClick={() => toast({ tone: 'danger', title: 'Build failed', duration: 0 })}>
        Sticky danger
      </Button>
    </div>
  );
}

export default function Demo() {
  // DhaakonProvider already mounts one; nested here so the demo is self-contained.
  return <ToastProvider><Trigger /></ToastProvider>;
}
