import { Badge } from '@dhaakon/ui';

const tones = ['neutral', 'accent', 'info', 'success', 'warning', 'danger'] as const;

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '0.75rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tones.map((t) => <Badge key={t} tone={t}>{t}</Badge>)}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tones.map((t) => <Badge key={t} tone={t} solid>{t}</Badge>)}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <Badge tone="success" dot>Healthy</Badge>
        <Badge tone="warning" dot>Degraded</Badge>
        <Badge tone="danger" dot>Down</Badge>
      </div>
    </div>
  );
}
