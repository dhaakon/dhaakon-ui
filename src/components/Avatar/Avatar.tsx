import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'busy' | 'away';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Image URL. Falls back to initials if it fails to load or is absent. */
  src?: string;
  /** Full name — used for the image alt text and to derive initials. */
  name?: string;
  /** Override the derived initials. */
  initials?: string;
  size?: AvatarSize;
  /** Square instead of circular. */
  square?: boolean;
  status?: AvatarStatus;
  /** Replaces initials when there is no image (e.g. an icon). */
  fallback?: ReactNode;
}

/** First letters of the first and last word: "David Poyner" → "DP". */
function initialsFrom(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '';
  if (parts.length === 1) return parts[0].slice(0, 2);
  return parts[0][0] + parts[parts.length - 1][0];
}

export function Avatar({
  src,
  name,
  initials,
  size = 'md',
  square,
  status,
  fallback,
  className,
  ...rest
}: AvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = src != null && !failed;
  const text = initials ?? (name ? initialsFrom(name) : '');

  return (
    <span
      className={cn('dhk-avatar', `dhk-avatar--${size}`, square && 'dhk-avatar--square', className)}
      // Without an image the initials are decorative shorthand for the name,
      // so the accessible name goes on the container instead.
      role={showImage ? undefined : 'img'}
      aria-label={showImage ? undefined : name}
      {...rest}
    >
      {showImage ? (
        <img src={src} alt={name ?? ''} onError={() => setFailed(true)} />
      ) : (
        (fallback ?? <span aria-hidden>{text}</span>)
      )}
      {status != null && <span className="dhk-avatar__status" data-status={status} />}
    </span>
  );
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Show at most this many, then a "+N" chip. */
  max?: number;
  size?: AvatarSize;
  children: ReactNode;
}

/** Overlapping stack of avatars with an overflow count. */
export function AvatarGroup({ max, size = 'md', className, children, ...rest }: AvatarGroupProps) {
  const all = Array.isArray(children) ? children.flat() : [children];
  const shown = max != null ? all.slice(0, max) : all;
  const overflow = all.length - shown.length;

  return (
    <div className={cn('dhk-avatar-group', className)} {...rest}>
      {shown}
      {overflow > 0 && <Avatar size={size} initials={`+${overflow}`} aria-label={`${overflow} more`} />}
    </div>
  );
}
