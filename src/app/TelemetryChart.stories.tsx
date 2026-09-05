import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { TelemetryChart } from './TelemetryChart';
import { CodeSnippet } from './CodeSnippet';
import { LogViewer, type LogEntry } from './LogViewer';
import { Button } from '../components/Button/Button';

const meta: Meta = {
  title: 'Composites/Research instruments',
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

export const Telemetry: Story = {
  render: () => <TelemetryChart
    title="Render duration / sample"
    description="Deterministic demonstration values, not a machine benchmark. Toggle a series or inspect an exact sample."
    labels={['00:00', '00:01', '00:02', '00:03', '00:04', '00:05']}
    unit="ms"
    series={[
      { id: 'vector', label: 'Vector pass', values: [18, 14, 24, 19, 12, 17] },
      { id: 'filter', label: 'Filter pass', values: [8, 12, null, 9, 13, 10], tone: 'accent' },
    ]}
  />,
};

export const CodeArtifact: Story = {
  render: () => <CodeSnippet title="cue-sheet.json" language="json" code={'{\n  "name": "Research take",\n  "frameRate": 24,\n  "seed": 42,\n  "targets": ["vector", "mask", "typography"]\n}\n'} />,
};

export const EventSnapshots: Story = {
  render: () => <EventExample />,
};

function EventExample() {
  const [entries, setEntries] = useState<LogEntry[]>([
    { id: '0', timestamp: 'sample 000', level: 'info', source: 'fixture', message: 'Local simulation initialized.' },
  ]);
  return <div style={{ display: 'grid', gap: '1rem' }}>
    <p>This button appends a fixture event. Pause the viewer, append more events, then resume.</p>
    <Button onClick={() => setEntries((previous) => {
      const index = previous.length;
      return [...previous, { id: String(index), timestamp: `sample ${String(index).padStart(3, '0')}`, level: index % 3 === 0 ? 'warn' : 'info', source: 'fixture', message: `Recorded fixture sample ${index}.` }];
    })}>Append fixture event</Button>
    <LogViewer entries={entries} maxEntries={20} />
  </div>;
}
