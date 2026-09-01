import { type ReactNode } from 'react';
import {
  FileTrigger as AriaFileTrigger,
  DropZone as AriaDropZone,
  Text,
  type FileTriggerProps,
  type DropZoneProps as AriaDropZoneProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';

export type { FileTriggerProps };

/**
 * Wraps a `<Button>` so it opens the file dialog.
 *
 * A styled `<input type="file">` is the usual approach and the usual bug —
 * this keeps a real button, with real focus and keyboard behaviour, and drives
 * the hidden input for it.
 *
 * ```tsx
 * <FileTrigger onSelect={handle}><Button>Choose files…</Button></FileTrigger>
 * ```
 */
export function FileTrigger(props: FileTriggerProps) {
  return <AriaFileTrigger {...props} />;
}

export interface DropZoneProps extends Omit<AriaDropZoneProps, 'children' | 'className'> {
  /** Headline inside the zone. */
  label?: ReactNode;
  /** Small print — accepted types, size limit. */
  hint?: ReactNode;
  /** Usually a `<FileTrigger>` wrapping a button, so there is a keyboard route in. */
  children?: ReactNode;
  className?: string;
}

/**
 * A drag-and-drop target for files.
 *
 * Drag and drop alone is unusable by keyboard, so always pass a `FileTrigger`
 * as `children` — React Aria makes the zone itself focusable and pasteable,
 * but the visible button is what most people will reach for.
 */
export function DropZone({ label, hint, children, className, ...rest }: DropZoneProps) {
  return (
    <AriaDropZone {...rest} className={cn('dhk-dropzone', className)}>
      {label != null && <Text slot="label">{label}</Text>}
      {children}
      {hint != null && <span className="dhk-dropzone__hint">{hint}</span>}
    </AriaDropZone>
  );
}
