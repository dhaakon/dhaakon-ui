import { NumberField } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: 240 }}>
      <NumberField label="Replicas" defaultValue={3} minValue={1} maxValue={8} />
      <NumberField label="CPU quota" defaultValue={0.5} minValue={0} maxValue={1} step={0.05}
        formatOptions={{ style: 'percent' }} />
      <NumberField label="Monthly cost" defaultValue={35}
        formatOptions={{ style: 'currency', currency: 'USD' }} />
    </div>
  );
}
