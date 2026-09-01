import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface Notification {
  id: string;
  title: ReactNode;
  body?: ReactNode;
  time?: ReactNode;
  unread?: boolean;
  /** Buttons or links under the body. */
  actions?: ReactNode;
}

export interface NotificationListProps extends HTMLAttributes<HTMLUListElement> {
  items: Notification[];
  label?: string;
}

/**
 * A read/unread list for a notifications panel.
 *
 * Unread state is carried by an accent dot *and* by weight and background —
 * a dot alone fails for anyone who cannot distinguish it, and the visually
 * hidden "Unread" text means it is announced rather than merely seen.
 */
export function NotificationList({
  items,
  label = 'Notifications',
  className,
  ...rest
}: NotificationListProps) {
  return (
    <ul className={cn('dhk-notiflist', className)} aria-label={label} {...rest}>
      {items.map((n) => (
        <li className="dhk-notif" key={n.id} data-unread={n.unread ? '' : undefined}>
          <span className="dhk-notif__dot" aria-hidden />
          <span className="dhk-notif__title">
            {n.unread && (
              <span
                style={{
                  position: 'absolute',
                  width: 1,
                  height: 1,
                  overflow: 'hidden',
                  clip: 'rect(0 0 0 0)',
                  whiteSpace: 'nowrap',
                }}
              >
                Unread.{' '}
              </span>
            )}
            {n.title}
          </span>
          {n.time != null && <time className="dhk-notif__time">{n.time}</time>}
          {n.body != null && <div className="dhk-notif__body">{n.body}</div>}
          {n.actions != null && <div className="dhk-notif__actions">{n.actions}</div>}
        </li>
      ))}
    </ul>
  );
}
