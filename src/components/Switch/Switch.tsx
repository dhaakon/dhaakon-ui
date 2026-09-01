import { type ReactNode } from 'react';
import { Switch as AriaSwitch, type SwitchProps as AriaSwitchProps } from 'react-aria-components';
import { cn } from '../../lib/cn';

export interface SwitchProps extends Omit<AriaSwitchProps, 'children' | 'className'> {
  children?: ReactNode;
  className?: string;
  /** Put the label before the track. */
  labelPosition?: 'start' | 'end';
}

/**
 * On/off toggle. A square knob on a hairline track — a pill would be the only
 * rounded control in the system.
 *
 * Use for state that applies immediately; use `Checkbox` inside a form that is
 * submitted.
 */
export function Switch({ children, className, labelPosition = 'end', ...rest }: SwitchProps) {
  const track = (
    <span className="dhk-switch__track" aria-hidden>
      <span className="dhk-switch__thumb" />
    </span>
  );
  return (
    <AriaSwitch
      {...rest}
      className={cn('dhk-switch', className)}
      style={labelPosition === 'start' ? { gridTemplateColumns: '1fr auto' } : undefined}
    >
      {labelPosition === 'start' ? (
        <>
          <span>{children}</span>
          {track}
        </>
      ) : (
        <>
          {track}
          <span>{children}</span>
        </>
      )}
    </AriaSwitch>
  );
}
