import { Slider } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: 340 }}>
      <Slider label="Memory limit" defaultValue={512} minValue={128} maxValue={4096} step={128} />
      <Slider<number[]> label="Port range" defaultValue={[21700, 21800]} minValue={21000} maxValue={22000} step={10} />
    </div>
  );
}
