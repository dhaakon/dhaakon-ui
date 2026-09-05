import { useId, useState } from 'react';
import { cn } from '../lib/cn';

export type TelemetryTone = 'accent' | 'info' | 'success' | 'warning' | 'neutral';

export interface TelemetrySeries {
  id: string;
  label: string;
  /** One value per label. Missing or non-finite values create a gap, never a fabricated zero. */
  values: readonly (number | null)[];
  tone?: TelemetryTone;
}

export interface TelemetryChartProps {
  title: string;
  description?: string;
  labels: readonly string[];
  series: readonly TelemetrySeries[];
  unit?: string;
  height?: number;
  /** Start with the semantic data table expanded. It always remains available. */
  showDataTable?: boolean;
  className?: string;
}

const COLORS: Record<TelemetryTone, string> = {
  accent: 'var(--dhk-accent-text)',
  info: 'var(--dhk-info)',
  success: 'var(--dhk-success)',
  warning: 'var(--dhk-warning)',
  neutral: 'var(--dhk-text)',
};
const TONES: TelemetryTone[] = ['info', 'accent', 'success', 'warning', 'neutral'];
const DASHES = ['none', '8 4', '2 4', '10 3 2 3', '5 3'];
const NUMBER_FORMAT = new Intl.NumberFormat('en-US', { maximumFractionDigits: 3 });

function finite(value: number | null | undefined): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function formatNumber(value: number) {
  if (value !== 0 && (Math.abs(value) >= 1000000 || Math.abs(value) < 0.001)) {
    return value.toExponential(2);
  }
  return NUMBER_FORMAT.format(value);
}

/** Deterministic SVG chart with non-color series cues, sample inspection and a complete data table. */
export function TelemetryChart({
  title,
  description,
  labels,
  series,
  unit = '',
  height = 260,
  showDataTable = false,
  className,
}: TelemetryChartProps) {
  const id = useId();
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [sample, setSample] = useState(0);
  const [tableOpen, setTableOpen] = useState(showDataTable);
  const selectedSample = Math.min(sample, Math.max(0, labels.length - 1));
  const chartHeight = Number.isFinite(height) ? Math.max(180, Math.min(640, height)) : 260;
  const width = 800;
  const left = 78;
  const right = width - 20;
  const top = 26;
  const bottom = chartHeight - 42;
  const shown = series.filter((item) => !hidden.has(item.id));
  // Normalize before subtracting so a valid +/-1e308 dataset cannot overflow the domain.
  let scale = 1;
  for (const item of shown) {
    for (let index = 0; index < labels.length; index++) {
      const value = item.values[index];
      if (finite(value)) scale = Math.max(scale, Math.abs(value));
    }
  }
  let minimum = 0;
  let maximum = 0;
  let hasValues = false;
  for (const item of shown) {
    for (let index = 0; index < labels.length; index++) {
      const value = item.values[index];
      if (!finite(value)) continue;
      hasValues = true;
      minimum = Math.min(minimum, value / scale);
      maximum = Math.max(maximum, value / scale);
    }
  }
  if (minimum === maximum) maximum = minimum + 1;
  const span = maximum - minimum;
  const x = (index: number) => labels.length <= 1 ? (left + right) / 2 : left + index / (labels.length - 1) * (right - left);
  const y = (value: number) => bottom - (value / scale - minimum) / span * (bottom - top);
  const valueText = (value: number | null | undefined, exact = false) => finite(value) ? `${exact ? String(value) : formatNumber(value)}${unit ? ` ${unit}` : ''}` : 'No sample';
  const ticks = [0, 0.5, 1];
  const labelIndices = [...new Set([0, Math.floor((labels.length - 1) / 2), labels.length - 1])].filter((index) => index >= 0);

  return (
    <figure className={cn('dhk-chart', className)} aria-labelledby={`${id}-title`}>
      <figcaption className="dhk-chart__header">
        <div>
          <h3 id={`${id}-title`}>{title}</h3>
          {description && <p>{description}</p>}
        </div>
        <span className="dhk-chart__unit">{unit || 'Value'} · {labels.length} samples</span>
      </figcaption>
      <ul className="dhk-chart__legend" aria-label="Chart series visibility">
        {series.map((item, index) => (
          <li key={item.id}>
            <button type="button" aria-pressed={!hidden.has(item.id)} onClick={() => setHidden((previous) => {
              const next = new Set(previous);
              if (next.has(item.id)) next.delete(item.id);
              else next.add(item.id);
              return next;
            })}>
              <svg width="26" height="10" aria-hidden="true"><line x1="0" x2="26" y1="5" y2="5" stroke={COLORS[item.tone ?? TONES[index % TONES.length]]} strokeWidth="2" strokeDasharray={DASHES[index % DASHES.length]} /></svg>
              {item.label}
              <span className="dhk-chart__legend-state">{hidden.has(item.id) ? 'Hidden' : 'Shown'}</span>
            </button>
          </li>
        ))}
      </ul>
      <svg className="dhk-chart__svg" viewBox={`0 0 ${width} ${chartHeight}`} role="img" aria-labelledby={`${id}-graphic-title`} aria-describedby={`${id}-graphic-desc`}>
        <title id={`${id}-graphic-title`}>{title}</title>
        <desc id={`${id}-graphic-desc`}>{hasValues ? `${shown.length} visible series, ${labels.length} sample positions. ${unit ? `Unit: ${unit}. ` : ''}Inspect a sample with the slider or open the data table for exact values.` : 'No visible samples. Enable a series or supply data.'}</desc>
        {ticks.map((tick) => {
          const normalized = minimum + tick * span;
          const ty = bottom - tick * (bottom - top);
          return <g key={tick} className="dhk-chart__axis"><line x1={left} x2={right} y1={ty} y2={ty} /><text x={left - 10} y={ty + 4} textAnchor="end">{formatNumber(normalized * scale)}</text></g>;
        })}
        {labelIndices.map((index) => <text className="dhk-chart__label" key={index} x={x(index)} y={chartHeight - 14} textAnchor={index === 0 ? 'start' : index === labels.length - 1 ? 'end' : 'middle'}>{labels[index]}</text>)}
        {series.map((item, seriesIndex) => {
          if (hidden.has(item.id)) return null;
          let previousValid = false;
          const points: string[] = [];
          const dots: { x: number; y: number }[] = [];
          for (let index = 0; index < labels.length; index++) {
            const value = item.values[index];
            if (!finite(value)) { previousValid = false; continue; }
            points.push(`${previousValid ? 'L' : 'M'}${x(index).toFixed(3)},${y(value).toFixed(3)}`);
            if (!previousValid && (index === labels.length - 1 || !finite(item.values[index + 1]))) dots.push({ x: x(index), y: y(value) });
            previousValid = true;
          }
          return <g key={item.id} fill="none" stroke={COLORS[item.tone ?? TONES[seriesIndex % TONES.length]]} strokeWidth="2.25" strokeDasharray={DASHES[seriesIndex % DASHES.length]}>
            <path d={points.join(' ')} vectorEffect="non-scaling-stroke" />
            {dots.map((point, index) => <circle key={index} cx={point.x} cy={point.y} r="3" strokeDasharray="none" />)}
          </g>;
        })}
        {hasValues && labels.length > 0 && <line className="dhk-chart__cursor" x1={x(selectedSample)} x2={x(selectedSample)} y1={top} y2={bottom} />}
        {!hasValues && <text className="dhk-chart__empty" x={(left + right) / 2} y={(top + bottom) / 2} textAnchor="middle">{series.length > 0 && shown.length === 0 ? 'All series hidden' : 'No samples supplied'}</text>}
      </svg>
      {labels.length > 0 && <div className="dhk-chart__inspection">
        <label htmlFor={`${id}-sample`}>Inspect sample <span>{labels[selectedSample]}</span></label>
        <input id={`${id}-sample`} type="range" min={0} max={Math.max(0, labels.length - 1)} step={1} value={selectedSample} disabled={labels.length < 2} aria-valuetext={labels[selectedSample]} onChange={(event) => setSample(Number(event.target.value))} />
        <dl>{shown.map((item) => <div key={item.id}><dt>{item.label}</dt><dd>{valueText(item.values[selectedSample])}</dd></div>)}</dl>
      </div>}
      <details className="dhk-chart__data" open={tableOpen} onToggle={(event) => setTableOpen(event.currentTarget.open)}>
        <summary>Data table · exact supplied values</summary>
        <div className="dhk-chart__table-scroll" role="region" aria-label={`${title} data`} tabIndex={0}>
          <table>
            <caption>{title}{unit ? ` (${unit})` : ''}. All series, including hidden lines.</caption>
            <thead><tr><th scope="col">Sample</th>{series.map((item) => <th scope="col" key={item.id}>{item.label}</th>)}</tr></thead>
            <tbody>{labels.map((label, index) => <tr key={index}><th scope="row">{label}</th>{series.map((item) => <td key={item.id}>{valueText(item.values[index], true)}</td>)}</tr>)}</tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
