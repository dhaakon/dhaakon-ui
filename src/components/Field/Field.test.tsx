import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import axe from 'axe-core';
import { Field } from './Field';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { SearchField } from '../SearchField/SearchField';
import { Select, SelectItem } from '../Select/Select';
import { ComboBox } from '../ComboBox/ComboBox';
import { NumberField } from '../NumberField/NumberField';
import { DateField, TimeField } from '../DateField/DateField';
import { DatePicker, DateRangePicker } from '../DatePicker/DatePicker';
import { Checkbox, CheckboxGroup } from '../Checkbox/Checkbox';
import { Radio, RadioGroup } from '../Radio/Radio';
import { Slider } from '../Slider/Slider';
import { ColorField } from '../ColorPicker/ColorPicker';

describe('Field wiring', () => {
  it.each([Input, Textarea])('adopts a control id and conveys required and hint/error transitions', async (Control) => {
    const user = userEvent.setup();
    const { rerender } = render(<Field label="Project" required hint="Use a stable name"><Control id="project" /></Field>);
    const input = screen.getByRole('textbox', { name: 'Project' });
    expect(input).toBeRequired();
    expect(input).toHaveAccessibleDescription('Use a stable name');
    await user.click(screen.getByText('Project'));
    expect(input).toHaveFocus();
    rerender(<Field label="Project" required hint="Use a stable name" error="Name exists"><Control id="project" /></Field>);
    expect(input).toBeInvalid();
    expect(input).toHaveAccessibleDescription('Name exists');
    for (const id of input.getAttribute('aria-describedby')!.split(' ')) expect(document.getElementById(id)).not.toBeNull();
  });

  it('makes an explicit Field id authoritative over its control id', () => {
    render(<Field id="field-id" label="Project"><Input id="child-id" /></Field>);
    expect(screen.getByRole('textbox', { name: 'Project' })).toHaveAttribute('id', 'field-id');
  });
});

const controls = [
  ['SearchField', <SearchField label="Research control" description="Helpful description" />],
  ['Select', <Select label="Research control" description="Helpful description"><SelectItem id="one">One</SelectItem></Select>],
  ['ComboBox', <ComboBox label="Research control" description="Helpful description"><SelectItem id="one">One</SelectItem></ComboBox>],
  ['NumberField', <NumberField label="Research control" description="Helpful description" />],
  ['DateField', <DateField label="Research control" description="Helpful description" />],
  ['TimeField', <TimeField label="Research control" description="Helpful description" />],
  ['DatePicker', <DatePicker label="Research control" description="Helpful description" />],
  ['DateRangePicker', <DateRangePicker label="Research control" description="Helpful description" />],
  ['CheckboxGroup', <CheckboxGroup label="Research control" description="Helpful description"><Checkbox value="one">One</Checkbox></CheckboxGroup>],
  ['RadioGroup', <RadioGroup label="Research control" description="Helpful description"><Radio value="one">One</Radio></RadioGroup>],
] as const;

describe('React Aria form labels', () => {
  it.each(controls)('%s connects visible labels and descriptions', async (_name, control) => {
    const { container } = render(control);
    const label = screen.getByText('Research control');
    expect(label.id).not.toBe('');
    expect(
      label.hasAttribute('for') || Array.from(container.querySelectorAll('[aria-labelledby]')).some((element) => element.getAttribute('aria-labelledby')?.split(' ').includes(label.id)),
    ).toBe(true);
    const description = screen.getByText('Helpful description');
    expect(description.id).not.toBe('');
    expect(Array.from(container.querySelectorAll('[aria-describedby]')).some((element) => element.getAttribute('aria-describedby')?.split(' ').includes(description.id))).toBe(true);
    const result = await axe.run(container, { rules: { 'color-contrast': { enabled: false }, region: { enabled: false } } });
    expect(result.violations.map((violation) => ({ id: violation.id, nodes: violation.nodes.map((node) => node.html) }))).toEqual([]);
  });

  it('names slider thumbs and color inputs', () => {
    render(<><Slider label="Intensity" /><ColorField label="Hex color" /></>);
    expect(screen.getByRole('slider')).toHaveAccessibleName('Intensity');
    expect(screen.getByRole('textbox', { name: 'Hex color' })).toBeInTheDocument();
  });

  it('announces explicit validation errors and allows an explicit invalid override', () => {
    const { rerender } = render(<NumberField label="Concurrency" errorMessage="Too many workers" />);
    const input = screen.getByRole('textbox', { name: 'Concurrency' });
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Too many workers');
    rerender(<NumberField label="Concurrency" errorMessage="Too many workers" isInvalid={false} />);
    expect(input).not.toHaveAttribute('aria-invalid', 'true');
    expect(screen.queryByText('Too many workers')).not.toBeInTheDocument();
  });

  it('exposes Select validation on its visible, focusable trigger', () => {
    render(<Select label="Region" errorMessage="Choose an available region"><SelectItem id="one">One</SelectItem></Select>);
    const trigger = screen.getByRole('button', { name: /Region/ });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAccessibleDescription('Choose an available region');
  });

  it('renders native validation messages without an explicit errorMessage', async () => {
    const user = userEvent.setup();
    render(<form><Select name="region" label="Region" isRequired><SelectItem id="one">One</SelectItem></Select><button type="submit">Submit</button></form>);
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    const trigger = screen.getByRole('button', { name: /Region/ });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger.getAttribute('aria-describedby')).toBeTruthy();
    expect(trigger).toHaveAccessibleDescription();
  });
});
