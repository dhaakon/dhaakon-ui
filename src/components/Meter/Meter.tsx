import { type ReactNode } from 'react';
import { Meter as AriaMeter, type MeterProps as AriaMeterProps } from 'react-aria-components';
import { cn } from '../../lib/cn';

export interface MeterProps extends Omit<AriaMeterProps, 'children' | 'className'> {
  label?: ReactNode;
  showValue?: boolean;
  /** Fraction above which the fill turns warning, then critical. */
  warnAt?: number;
  criticalAt?: number;
  className?: string;
}

/**
 * A static measurement within a known range — disk used, quota consumed,
 * memory pressure.
 *
 * Not `Progress`: that reports a task advancing towards completion, and
 * screen readers describe the two differently. If it will not finish, it is a
 * meter.
 */
export function Meter({
  label,
  showValue = true,
  warnAt = 0.75,
  criticalAt = 0.9,
  className,
  ...rest
}: MeterProps) {
  return (
    <AriaMeter {...rest} className={cn('dhk-meter', className)}>
      {({ percentage, valueText }) => {
        const f = percentage / 100;
        return (
          <>
            {(label != null || showValue) && (
              <div className="dhk-meter__head">
                {label != null && <span className="dhk-meter__label">{label}</span>}
                {showValue && <span className="dhk-meter__value">{valueText}</span>}
              </div>
            )}
            <div
              className="dhk-meter__track"
              data-level={f >= criticalAt ? 'critical' : f >= warnAt ? 'warning' : 'ok'}
              // The level drives the fill colour, so it sits on the element
              // whose child is painted.
              style={{ ['--_f' as string]: String(f) }}
            >
              <div className="dhk-meter__fill" style={{ width: `${percentage}%` }} />
            </div>
          </>
        );
      }}
    </AriaMeter>
  );
}
