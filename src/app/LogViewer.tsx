import { useId, useState } from 'react';
import { Button } from '../components/Button/Button';
import { cn } from '../lib/cn';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  /** Unique stable key within the supplied collection. */
  id: string;
  /** Supplied display timestamp. The viewer never invents clock times. */
  timestamp: string;
  level: LogLevel;
  message: string;
  source?: string;
}

export interface LogViewerProps {
  /** Ordered oldest first. The viewer retains the tail and never sorts or invents timestamps. */
  entries: readonly LogEntry[];
  label?: string;
  /** Maximum retained visible snapshot, clamped to 1–5,000. Defaults to 200. */
  maxEntries?: number;
  /** Label the caller-supplied feed as streaming; this component does not connect to a backend. */
  isStreaming?: boolean;
  className?: string;
}

/** Searchable bounded log view. Pause freezes a snapshot; resuming catches up with the supplied data. */
export function LogViewer({ entries, label = 'Event log', maxEntries = 200, isStreaming = false, className }: LogViewerProps) {
  const titleId = useId();
  const searchId = useId();
  const levelId = useId();
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState<LogLevel | 'all'>('all');
  const [snapshot, setSnapshot] = useState<readonly LogEntry[] | null>(null);
  const [showNewestFirst, setShowNewestFirst] = useState(false);
  const limit = Number.isFinite(maxEntries) ? Math.max(1, Math.min(5000, Math.trunc(maxEntries))) : 200;
  const paused = snapshot != null;
  const recent = (snapshot ?? entries).slice(-limit);
  const needle = query.trim().toLocaleLowerCase();
  const filtered = recent.filter((entry) =>
    (level === 'all' || entry.level === level) &&
    (!needle || `${entry.timestamp} ${entry.source ?? ''} ${entry.level} ${entry.message}`.toLocaleLowerCase().includes(needle)),
  );
  const visible = showNewestFirst ? [...filtered].reverse() : filtered;

  return (
    <section className={cn('dhk-log', className)} aria-labelledby={titleId}>
      <header className="dhk-log__header">
        <h3 id={titleId}>{label}</h3>
        <span className="dhk-log__mode">{paused ? 'Snapshot paused' : isStreaming ? 'Receiving supplied events' : 'Supplied snapshot'}</span>
        <Button variant="outline" size="sm" aria-pressed={paused} onClick={() => setSnapshot(paused ? null : entries.slice(-limit).map((entry) => ({ ...entry })))}>
          {paused ? 'Resume updates' : 'Pause updates'}
        </Button>
      </header>
      <div className="dhk-log__filters">
        <label htmlFor={searchId}>
          Search events
          <input id={searchId} type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Message, source or timestamp…" />
        </label>
        <label htmlFor={levelId}>
          Level
          <select id={levelId} value={level} onChange={(event) => setLevel(event.target.value as LogLevel | 'all')}>
            <option value="all">All levels</option>
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warn">Warning</option>
            <option value="error">Error</option>
          </select>
        </label>
        <Button variant="ghost" size="sm" aria-pressed={showNewestFirst} onClick={() => setShowNewestFirst((previous) => !previous)}>
          Newest first
        </Button>
      </div>
      <p className="dhk-log__summary" role="status" aria-live="polite">
        {visible.length} of {recent.length} retained events · limit {limit}{paused ? ' · updates paused' : ''}
      </p>
      <div className="dhk-log__scroll" role="region" aria-label={`${label} entries`} tabIndex={0}>
        {visible.length === 0 ? (
          <p className="dhk-log__empty">{recent.length === 0 ? 'No events supplied.' : 'No matching events. Change the search or level filter.'}</p>
        ) : (
          <ol className="dhk-log__entries" aria-live="off">
            {visible.map((entry) => (
              <li key={entry.id} className="dhk-log__entry" data-level={entry.level}>
                <span className="dhk-log__time">{entry.timestamp}</span>
                <span className="dhk-log__level">{entry.level}</span>
                <span className="dhk-log__message">{entry.source && <span className="dhk-log__source">[{entry.source}] </span>}{entry.message}</span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
