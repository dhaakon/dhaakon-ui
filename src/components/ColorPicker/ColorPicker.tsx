import { type ReactNode } from 'react';
import {
  Label,
  ColorPicker as AriaColorPicker,
  ColorArea,
  ColorSlider,
  ColorField as AriaColorField,
  ColorSwatch as AriaColorSwatch,
  ColorThumb,
  SliderTrack,
  Input as AriaInput,
  Button as AriaButton,
  DialogTrigger,
  Popover,
  Dialog,
  type ColorPickerProps as AriaColorPickerProps,
  type ColorFieldProps as AriaColorFieldProps,
  type ColorSwatchProps as AriaColorSwatchProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';

export interface ColorSwatchProps extends Omit<AriaColorSwatchProps, 'className'> {
  className?: string;
}

/** A solid chip of colour. Checkerboards automatically behind transparency. */
export function ColorSwatch({ className, ...rest }: ColorSwatchProps) {
  return <AriaColorSwatch {...rest} className={cn('dhk-colorswatch', className)} />;
}

export interface ColorFieldProps extends Omit<AriaColorFieldProps, 'children' | 'className'> {
  label?: ReactNode;
  className?: string;
}

/** A hex input that parses and normalises what is typed. */
export function ColorField({ label, className, ...rest }: ColorFieldProps) {
  return (
    <AriaColorField {...rest} className={cn('dhk-field', className)}>
      {label != null && <Label className="dhk-control-label">{label}</Label>}
      <div className="dhk-searchfield__box">
        <AriaInput />
      </div>
    </AriaColorField>
  );
}

export interface ColorPickerProps extends Omit<AriaColorPickerProps, 'children'> {
  label?: ReactNode;
  className?: string;
}

/**
 * Swatch trigger, saturation/brightness area, hue and alpha sliders, hex field.
 *
 * The area is a real 2-D slider — arrow keys move it in both axes and the
 * current colour is announced, which a canvas-and-mousedown implementation
 * cannot do.
 */
export function ColorPicker({ label, className, ...rest }: ColorPickerProps) {
  return (
    <AriaColorPicker {...rest}>
      <DialogTrigger>
        <AriaButton
          className={cn('dhk-btn', 'dhk-btn--outline', className)}
          style={{ gap: 'var(--dhk-space-3)' }}
        >
          <ColorSwatch />
          {label}
        </AriaButton>
        <Popover className="dhk-popover" placement="bottom start">
          <Dialog className="dhk-colorpicker__panel" aria-label="Choose color">
            <ColorArea
              className="dhk-colorarea"
              colorSpace="hsb"
              xChannel="saturation"
              yChannel="brightness"
            >
              <ColorThumb className="dhk-colorthumb" />
            </ColorArea>
            <ColorSlider className="dhk-colorslider" colorSpace="hsb" channel="hue">
              <SliderTrack className="dhk-colorslider__track">
                <ColorThumb className="dhk-colorthumb" />
              </SliderTrack>
            </ColorSlider>
            <ColorSlider className="dhk-colorslider" channel="alpha">
              <SliderTrack className="dhk-colorslider__track">
                <ColorThumb className="dhk-colorthumb" />
              </SliderTrack>
            </ColorSlider>
            <div className="dhk-colorfield__row">
              <ColorSwatch />
              <ColorField aria-label="Hex color" />
            </div>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </AriaColorPicker>
  );
}
