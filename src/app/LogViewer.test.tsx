import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { LogViewer, type LogEntry } from './LogViewer';

const entries: LogEntry[] = [
  { id: '1', timestamp: '00:00.00', level: 'info', message: 'Run started', source: 'runner' },
  { id: '2', timestamp: '00:00.50', level: 'warn', message: 'Slow sample', source: 'sampler' },
  { id: '3', timestamp: '00:01.00', level: 'error', message: 'Artifact failed', source: 'writer' },
];

describe('LogViewer', () => {
  it('bounds supplied data, filters by text and level, and states snapshot provenance', async () => {
    const user = userEvent.setup();
    render(<LogViewer entries={entries} maxEntries={2} />);
    expect(screen.queryByText('Run started')).not.toBeInTheDocument();
    expect(screen.getByText('Supplied snapshot')).toBeVisible();
    expect(screen.getByRole('status')).toHaveTextContent('2 of 2 retained events · limit 2');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Level' }), 'error');
    expect(screen.queryByText('Slow sample')).not.toBeInTheDocument();
    await user.type(screen.getByRole('searchbox', { name: 'Search events' }), 'missing');
    expect(screen.getByText(/No matching events/)).toBeVisible();
  });

  it('freezes updates while paused, retains search, and catches up on resume', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<LogViewer entries={entries.slice(0, 1)} isStreaming />);
    await user.click(screen.getByRole('button', { name: 'Pause updates' }));
    rerender(<LogViewer entries={entries} isStreaming />);
    expect(screen.queryByText('Artifact failed')).not.toBeInTheDocument();
    expect(screen.getByText('Snapshot paused')).toBeVisible();
    await user.type(screen.getByRole('searchbox', { name: 'Search events' }), 'run');
    expect(screen.getByText('Run started')).toBeVisible();
    await user.clear(screen.getByRole('searchbox'));
    await user.click(screen.getByRole('button', { name: 'Resume updates' }));
    expect(screen.getByText('Artifact failed')).toBeVisible();
    expect(screen.getByText('Receiving supplied events')).toBeVisible();
  });

  it('reverses display order explicitly and normalizes invalid retention limits', async () => {
    const user = userEvent.setup();
    render(<LogViewer entries={entries} maxEntries={Number.NaN} />);
    expect(screen.getByRole('status')).toHaveTextContent('limit 200');
    await user.click(screen.getByRole('button', { name: 'Newest first' }));
    const list = screen.getByRole('list');
    expect(within(list).getAllByRole('listitem')[0]).toHaveTextContent('Artifact failed');
  });
});
