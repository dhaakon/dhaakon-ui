import { type ReactNode } from 'react';
import {
  Label,
  Slider as AriaSlider,
  SliderTrack,
  SliderThumb,
  SliderOutput,
  type SliderProps as AriaSliderProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';

export interface SliderProps<T extends number | number[]>
  extends Omit<AriaSliderProps<T>, 'children' | 'className'> {
  label?: ReactNode;
  /** Show the current value beside the label. */
  showValue?: boolean;
  className?: string;
}

/**
 * Numeric range input. Pass an array for `value`/`defaultValue` to get a
 * two-thumb range.
 *
 * Arrow keys step, Home/End jump to the bounds, and the value is announced —
 * all from React Aria. Use `formatOptions` for currency/percent output.
 */
export function Slider<T extends number | number[] = number>({
  label,
  showValue = true,
  className,
  ...rest
}: SliderProps<T>) {
  return (
    <AriaSlider {...rest} className={cn('dhk-slider', className)}>
      {(label != null || showValue) && (
        <div className="dhk-slider__head">
          {label != null && <Label className="dhk-control-label">{label}</Label>}
          {showValue && <SliderOutput className="dhk-slider__output" />}
        </div>
      )}
      <SliderTrack className="dhk-slider__track">
        {({ state }) => {
          const start = state.values.length > 1 ? state.getThumbPercent(0) : 0;
          const end = state.getThumbPercent(state.values.length - 1);
          return (
            <>
              <div
                className="dhk-slider__fill"
                style={{ insetInlineStart: `${start * 100}%`, width: `${(end - start) * 100}%` }}
              />
              {state.values.map((_, i) => (
                <SliderThumb key={i} index={i} className="dhk-slider__thumb" />
              ))}
            </>
          );
        }}
      </SliderTrack>
    </AriaSlider>
  );
}
