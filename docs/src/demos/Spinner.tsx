import { Skeleton, Spinner } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: 380 }}>
      <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
        <Spinner size="sm" />
        <Spinner />
        <Spinner size="lg" accent />
      </div>
      <div style={{ display: 'flex', gap: '0.75rem' }} aria-busy>
        <Skeleton circle width={40} height={40} />
        <div style={{ flex: 1 }}><Skeleton text lines={3} /></div>
      </div>
    </div>
  );
}
