import { parseDate, Time } from '@internationalized/date';
import { DateField, TimeField } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: 260 }}>
      <DateField label="Start date" defaultValue={parseDate('2026-09-01')} />
      <TimeField label="Window opens" defaultValue={new Time(9, 30)} />
    </div>
  );
}
