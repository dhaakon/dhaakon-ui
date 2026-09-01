import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  XIcon,
} from '../../lib/icons';

export type AlertTone = 'neutral' | 'accent' | 'info' | 'success' | 'warning' | 'danger';

const DEFAULT_ICON: Record<AlertTone, ReactNode> = {
  neutral: <InfoIcon />,
  accent: <InfoIcon />,
  info: <InfoIcon />,
  success: <CheckCircleIcon />,
  warning: <AlertTriangleIcon />,
  danger: <AlertCircleIcon />,
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: ReactNode;
  children?: ReactNode;
  tone?: AlertTone;
  /** Override the tone's default icon. `null` removes it. */
  icon?: ReactNode | null;
  /** Renders a dismiss button. */
  onClose?: () => void;
  /** Buttons/links below the copy. */
  actions?: ReactNode;
}

/**
 * An inline message about the surrounding content — not a transient
 * notification (use `useToast` for those).
 *
 * `danger` and `warning` announce assertively; the rest are polite.
 */
export function Alert({
  title,
  children,
  tone = 'neutral',
  icon,
  onClose,
  actions,
  className,
  ...rest
}: AlertProps) {
  const glyph = icon === undefined ? DEFAULT_ICON[tone] : icon;
  const urgent = tone === 'danger' || tone === 'warning';

  return (
    <div
      role={urgent ? 'alert' : 'status'}
      aria-live={urgent ? 'assertive' : 'polite'}
      data-tone={tone}
      className={cn('dhk-alert', className)}
      {...rest}
    >
      {glyph != null ? (
        <span className="dhk-alert__icon" aria-hidden>
          {glyph}
        </span>
      ) : (
        <span />
      )}
      {title != null && <div className="dhk-alert__title">{title}</div>}
      {children != null && <div className="dhk-alert__desc">{children}</div>}
      {actions != null && <div className="dhk-alert__actions">{actions}</div>}
      {onClose && (
        <button type="button" className="dhk-alert__close" aria-label="Dismiss" onClick={onClose}>
          <XIcon />
        </button>
      )}
    </div>
  );
}
