import { type HTMLAttributes } from 'react';
import { cn } from '../lib/cn';
import { Progress } from '../components/Progress/Progress';
import { XIcon } from '../lib/icons';

export interface UploadFile {
  id: string;
  name: string;
  /** Size in bytes. */
  size?: number;
  /** 0–100 while uploading; omit when done. */
  progress?: number;
  error?: string;
}

export interface FileListProps extends HTMLAttributes<HTMLUListElement> {
  files: UploadFile[];
  onRemove?: (id: string) => void;
  label?: string;
}

function formatBytes(n?: number) {
  if (n == null) return null;
  const u = ['B', 'KB', 'MB', 'GB'];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < u.length - 1) { v /= 1024; i++; }
  return `${v.toFixed(v >= 100 || i === 0 ? 0 : 1)} ${u[i]}`;
}

/**
 * Selected or uploading files, with progress and a remove control.
 *
 * The companion to `DropZone`: the zone accepts files, this shows what
 * happened to them. Failures stay in the list with their reason rather than
 * vanishing.
 */
export function FileList({ files, onRemove, label = 'Files', className, ...rest }: FileListProps) {
  return (
    <ul className={cn('dhk-filelist', className)} aria-label={label} {...rest}>
      {files.map((f) => (
        <li className="dhk-filelist__item" key={f.id}>
          <span className="dhk-filelist__meta" aria-hidden>◫</span>
          <span className="dhk-filelist__name" title={f.name}>{f.name}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--dhk-space-3)' }}>
            {formatBytes(f.size) != null && (
              <span className="dhk-filelist__meta">{formatBytes(f.size)}</span>
            )}
            {onRemove && (
              <button
                type="button"
                className="dhk-tag__remove"
                aria-label={`Remove ${f.name}`}
                onClick={() => onRemove(f.id)}
              >
                <XIcon />
              </button>
            )}
          </span>
          {f.progress != null && f.error == null && (
            <div className="dhk-filelist__progress">
              <Progress
                aria-label={`Uploading ${f.name}`}
                value={f.progress}
                showValue={false}
                tone="accent"
              />
            </div>
          )}
          {f.error != null && <span className="dhk-filelist__error">{f.error}</span>}
        </li>
      ))}
    </ul>
  );
}

