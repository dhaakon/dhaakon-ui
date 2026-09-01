import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface ProcessStepProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  index: ReactNode;
  title: ReactNode;
  summary?: ReactNode;
  /** The deliverable — rendered as "Output — …". */
  output?: ReactNode;
  outputLabel?: ReactNode;
}

/** One step of a transfer/process sequence — `01 Listen … Output: workflow map`. */
export function ProcessStep({
  index,
  title,
  summary,
  output,
  outputLabel = 'Output',
  className,
  ...rest
}: ProcessStepProps) {
  return (
    <div className={cn('dhk-processstep', className)} {...rest}>
      <span className="dhk-processstep__index">{index}</span>
      <div>
        <div className="dhk-processstep__title">{title}</div>
        {summary != null && <p className="dhk-processstep__summary">{summary}</p>}
        {output != null && (
          <div className="dhk-processstep__output">
            {outputLabel} — <b>{output}</b>
          </div>
        )}
      </div>
    </div>
  );
}
