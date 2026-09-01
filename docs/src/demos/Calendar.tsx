import { parseDate } from '@internationalized/date';
import { Calendar, RangeCalendar } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      <Calendar aria-label="Deploy date" defaultValue={parseDate('2026-09-01')} />
      <RangeCalendar
        aria-label="Maintenance window"
        defaultValue={{ start: parseDate('2026-09-08'), end: parseDate('2026-09-12') }}
      />
    </div>
  );
}
