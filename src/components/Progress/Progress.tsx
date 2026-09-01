import { type ReactNode } from 'react';
import { ProgressBar, type ProgressBarProps } from 'react-aria-components';
import { cn } from '../../lib/cn';

export type ProgressTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger';

export interface ProgressProps extends Omit<ProgressBarProps, 'children' | 'className'> {
  label?: ReactNode;
  /** Show the percentage (or `formatOptions` value) beside the label. */
  showValue?: boolean;
  tone?: ProgressTone;
  className?: string;
}

/**
 * A determinate or indeterminate progress bar.
 * `aria-valuenow`/`valuetext` are managed by React Aria.
 */
export function Progress({
  label,
  showValue = true,
  tone = 'neutral',
  isIndeterminate,
  className,
  ...rest
}: ProgressProps) {
  return (
    <ProgressBar
      {...rest}
      isIndeterminate={isIndeterminate}
      data-tone={tone}
      className={cn('dhk-progress', isIndeterminate && 'dhk-progress--indeterminate', className)}
    >
      {({ percentage, valueText }) => (
        <>
          {(label != null || showValue) && (
            <div className="dhk-progress__head">
              {label != null && <span className="dhk-progress__label">{label}</span>}
              {showValue && !isIndeterminate && (
                <span className="dhk-progress__value">{valueText}</span>
              )}
            </div>
          )}
          <div className="dhk-progress__track">
            <div
              className="dhk-progress__fill"
              style={{ width: isIndeterminate ? undefined : `${percentage ?? 0}%` }}
            />
          </div>
        </>
      )}
    </ProgressBar>
  );
}

export interface ProgressRingProps extends Omit<ProgressBarProps, 'children' | 'className'> {
  /** Outer diameter in px. */
  size?: number;
  /** Stroke width in px. */
  thickness?: number;
  tone?: ProgressTone;
  /** Render the percentage in the middle. */
  showValue?: boolean;
  className?: string;
}

/** The same progress semantics drawn as a ring — for compact dashboard tiles. */
export function ProgressRing({
  size = 56,
  thickness = 4,
  tone = 'neutral',
  showValue = true,
  className,
  ...rest
}: ProgressRingProps) {
  const r = (size - thickness) / 2;
  const circumference = 2 * Math.PI * r;

  return (
    <ProgressBar
      {...rest}
      data-tone={tone}
      className={cn('dhk-progress-ring', className)}
      style={{ width: size, height: size }}
    >
      {({ percentage, valueText }) => (
        <>
          <svg width={size} height={size} aria-hidden>
            <circle
              className="dhk-progress-ring__track"
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              strokeWidth={thickness}
            />
            <circle
              className="dhk-progress-ring__fill"
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              strokeWidth={thickness}
              strokeDasharray={circumference}
              strokeDashoffset={circumference * (1 - (percentage ?? 0) / 100)}
            />
          </svg>
          {showValue && <span className="dhk-progress-ring__label">{valueText}</span>}
        </>
      )}
    </ProgressBar>
  );
}
