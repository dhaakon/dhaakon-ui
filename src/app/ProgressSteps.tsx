import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface Step {
  title: ReactNode;
  description?: ReactNode;
}

export interface ProgressStepsProps extends HTMLAttributes<HTMLOListElement> {
  steps: Step[];
  /** Zero-based index of the step in progress. */
  current: number;
  orientation?: 'horizontal' | 'vertical';
  label?: string;
}

/**
 * Where you are in a multi-step flow.
 *
 * Display only — it reports progress, it does not navigate. The current step
 * carries `aria-current="step"` so it is announced rather than merely
 * highlighted.
 */
export function ProgressSteps({
  steps,
  current,
  orientation = 'horizontal',
  label = 'Progress',
  className,
  ...rest
}: ProgressStepsProps) {
  return (
    <ol
      className={cn('dhk-steps', className)}
      data-orientation={orientation}
      aria-label={label}
      {...rest}
    >
      {steps.map((s, i) => {
        const state = i < current ? 'complete' : i === current ? 'current' : 'upcoming';
        return (
          <li className="dhk-step" data-state={state} key={i} aria-current={state === 'current' ? 'step' : undefined}>
            <span className="dhk-step__index">
              {state === 'complete' ? '✓' : String(i + 1).padStart(2, '0')}
            </span>
            <div style={{ minWidth: 0 }}>
              <div className="dhk-step__title">{s.title}</div>
              {s.description != null && <p className="dhk-step__desc">{s.description}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
