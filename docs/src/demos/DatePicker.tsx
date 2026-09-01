import { parseDate } from '@internationalized/date';
import { DatePicker, DateRangePicker } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: 400 }}>
      <DatePicker label="Deploy on" defaultValue={parseDate('2026-09-01')} />
      <DateRangePicker
        label="Maintenance window"
        defaultValue={{ start: parseDate('2026-09-08'), end: parseDate('2026-09-12') }}
        description="Both ends are inclusive."
      />
    </div>
  );
}
