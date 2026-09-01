import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface ActivityItem {
  id: string | number;
  /** An `<Avatar>` or `<FeaturedIcon>`; sits on the rail. */
  marker?: ReactNode;
  actor?: ReactNode;
  /** What they did — "pushed to", "closed". */
  action?: ReactNode;
  /** The object acted on. */
  target?: ReactNode;
  time?: ReactNode;
  /** Body copy, a diff, a quoted comment. */
  detail?: ReactNode;
}

export interface ActivityFeedProps extends HTMLAttributes<HTMLOListElement> {
  items: ActivityItem[];
}

/**
 * A vertical timeline of events.
 *
 * The connecting rail is drawn per item rather than down the whole list, so it
 * stops at the last marker instead of trailing into whitespace.
 */
export function ActivityFeed({ items, className, ...rest }: ActivityFeedProps) {
  return (
    <ol className={cn('dhk-feed', className)} {...rest}>
      {items.map((it) => (
        <li className="dhk-feed__item" key={it.id}>
          <div className="dhk-feed__marker">{it.marker}</div>
          <div className="dhk-feed__body">
            <div className="dhk-feed__head">
              {it.actor != null && <span className="dhk-feed__actor">{it.actor}</span>}
              {it.action != null && <span style={{ color: 'var(--dhk-text-muted)' }}>{it.action}</span>}
              {it.target}
              {it.time != null && <time className="dhk-feed__time">{it.time}</time>}
            </div>
            {it.detail != null && <div className="dhk-feed__detail">{it.detail}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
