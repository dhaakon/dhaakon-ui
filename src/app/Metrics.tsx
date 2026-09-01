import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface SparklineProps extends Omit<HTMLAttributes<SVGSVGElement>, 'values'> {
  values: number[];
  tone?: 'neutral' | 'accent' | 'success' | 'danger';
  /** Fill the area under the line. */
  area?: boolean;
  height?: number;
}

/**
 * A tiny trend line. Decorative by default — the number beside it carries the
 * meaning, so it is hidden from assistive tech unless you give it a label.
 */
export function Sparkline({
  values,
  tone = 'neutral',
  area = true,
  height = 32,
  className,
  'aria-label': ariaLabel,
  ...rest
}: SparklineProps) {
  if (values.length < 2) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  // A flat series would divide by zero; draw it down the middle instead.
  const span = max - min || 1;
  const step = 100 / (values.length - 1);
  const pts = values.map((v, i) => [i * step, 100 - ((v - min) / span) * 100] as const);
  const line = pts.map(([x, y]) => `${x},${y}`).join(' ');

  return (
    <svg
      className={cn('dhk-sparkline', className)}
      data-tone={tone}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ height }}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
      {...rest}
    >
      {area && <polygon className="dhk-sparkline__area" points={`0,100 ${line} 100,100`} />}
      <polyline className="dhk-sparkline__line" points={line} />
    </svg>
  );
}

export interface MetricTileProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  label: ReactNode;
  value: ReactNode;
  unit?: ReactNode;
  /** Signed change, e.g. `+12%`. The sign drives the colour. */
  delta?: string;
  /** Overrides the direction inferred from `delta`'s sign. */
  deltaDirection?: 'up' | 'down' | 'flat';
  /** Set when rising is bad — error rate, latency, cost. */
  invertDelta?: boolean;
  /** Context under the value: "vs. last week". */
  caption?: ReactNode;
  /** A `<Sparkline>`, or any small visual. */
  chart?: ReactNode;
}

/**
 * One number, with optional change and trend.
 *
 * `invertDelta` matters more than it looks: an increase is not automatically
 * good, and colouring a rising error rate green is worse than not colouring it.
 */
export function MetricTile({
  label,
  value,
  unit,
  delta,
  deltaDirection,
  invertDelta,
  caption,
  chart,
  className,
  ...rest
}: MetricTileProps) {
  const dir =
    deltaDirection ??
    (delta == null ? undefined : delta.startsWith('-') ? 'down' : delta.startsWith('+') ? 'up' : 'flat');

  return (
    <div
      className={cn('dhk-metric', className)}
      data-invert={invertDelta ? '' : undefined}
      {...rest}
    >
      <span className="dhk-metric__label">{label}</span>
      <span className="dhk-metric__value">
        {value}
        {unit != null && <span className="dhk-metric__unit">{unit}</span>}
      </span>
      {(delta != null || caption != null) && (
        <span className="dhk-metric__foot">
          {delta != null && (
            <span className="dhk-metric__delta" data-dir={dir}>
              {dir === 'up' ? '↑' : dir === 'down' ? '↓' : '→'} {delta.replace(/^[+-]/, '')}
            </span>
          )}
          {caption}
        </span>
      )}
      {chart}
    </div>
  );
}

export interface MetricRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Minimum tile width before the row wraps. Default `12rem`. */
  minWidth?: string;
  children: ReactNode;
}

/** A hairline-separated band of `MetricTile`s that wraps on narrow screens. */
export function MetricRow({ minWidth = '12rem', className, children, ...rest }: MetricRowProps) {
  return (
    <div
      className={cn('dhk-metricrow', className)}
      style={{ ['--_min' as string]: minWidth }}
      {...rest}
    >
      {children}
    </div>
  );
}
