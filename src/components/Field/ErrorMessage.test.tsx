import { type ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Field } from './Field';
import { Input } from '../Input/Input';
import { Textarea } from '../Textarea/Textarea';
import { Select, SelectItem } from '../Select/Select';
import { MultiSelect } from '../MultiSelect/MultiSelect';
import { ComboBox } from '../ComboBox/ComboBox';
import { NumberField } from '../NumberField/NumberField';
import { DateField, TimeField } from '../DateField/DateField';
import { DatePicker, DateRangePicker } from '../DatePicker/DatePicker';
import { Checkbox, CheckboxGroup } from '../Checkbox/Checkbox';
import { Radio, RadioGroup } from '../Radio/Radio';
import { Calendar, RangeCalendar } from '../Calendar/Calendar';

const props = { label: 'Research input', description: 'Helpful description' };
const controls: [string, (error: ReactNode) => ReactNode][] = [
  ['Field/Input', (error) => <Field label={props.label} hint={props.description} error={error}><Input /></Field>],
  ['Field/Textarea', (error) => <Field label={props.label} hint={props.description} error={error}><Textarea /></Field>],
  ['Select', (errorMessage) => <Select {...props} errorMessage={errorMessage}><SelectItem id="local">Local</SelectItem></Select>],
  ['MultiSelect', (errorMessage) => <MultiSelect {...props} options={[{ id: 'local', label: 'Local' }]} errorMessage={errorMessage} />],
  ['ComboBox', (errorMessage) => <ComboBox {...props} errorMessage={errorMessage}><SelectItem id="local">Local</SelectItem></ComboBox>],
  ['NumberField', (errorMessage) => <NumberField {...props} errorMessage={errorMessage} />],
  ['DateField', (errorMessage) => <DateField {...props} errorMessage={errorMessage} />],
  ['TimeField', (errorMessage) => <TimeField {...props} errorMessage={errorMessage} />],
  ['DatePicker', (errorMessage) => <DatePicker {...props} errorMessage={errorMessage} />],
  ['DateRangePicker', (errorMessage) => <DateRangePicker {...props} errorMessage={errorMessage} />],
  ['CheckboxGroup', (errorMessage) => <CheckboxGroup {...props} errorMessage={errorMessage}><Checkbox value="one">One</Checkbox></CheckboxGroup>],
  ['RadioGroup', (errorMessage) => <RadioGroup {...props} errorMessage={errorMessage}><Radio value="one">One</Radio></RadioGroup>],
];

function assertReferences(container: HTMLElement) {
  for (const element of container.querySelectorAll('[aria-describedby]')) {
    for (const id of element.getAttribute('aria-describedby')!.split(/\s+/)) {
      expect(document.getElementById(id), `Missing description id: ${id}`).not.toBeNull();
    }
  }
}

describe('ReactNode error content', () => {
  it.each(controls)('%s restores valid state and descriptions after a conditional error clears', (_name, renderControl) => {
    const { container, rerender } = render(renderControl(false));
    for (const error of [false, 'Problem detected', false]) {
      rerender(renderControl(error));
      if (error) {
        expect(screen.getByText('Problem detected')).toBeVisible();
        expect(container.querySelector('[data-invalid], [aria-invalid="true"]')).not.toBeNull();
      } else {
        expect(screen.queryByText('Problem detected')).not.toBeInTheDocument();
        expect(container.querySelector('[data-invalid], [aria-invalid="true"]')).toBeNull();
        const description = screen.getByText(props.description);
        expect(description).toBeVisible();
        expect([...container.querySelectorAll('[aria-describedby]')].some((element) => element.getAttribute('aria-describedby')?.split(' ').includes(description.id))).toBe(true);
      }
      assertReferences(container);
    }
  });

  it.each(controls)('%s ignores empty/boolean errors but preserves numeric zero content', (_name, renderControl) => {
    const { container, rerender } = render(renderControl(undefined));
    for (const error of [undefined, null, false, true, '', '  ', [], [false, '']]) {
      rerender(renderControl(error));
      expect(container.querySelector('[data-invalid], [aria-invalid="true"]')).toBeNull();
      expect(container.querySelector('.dhk-control-error, .dhk-field__error')).toBeNull();
      expect(screen.getByText(props.description)).toBeVisible();
      assertReferences(container);
    }
    rerender(renderControl(0));
    expect(container.querySelector('[data-invalid], [aria-invalid="true"]')).not.toBeNull();
    expect(container.querySelector('.dhk-control-error, .dhk-field__error')).toHaveTextContent('0');
    assertReferences(container);
  });

  it.each(['Select', 'MultiSelect'])('%s keeps native validation messages when conditional errorMessage is false', async (name) => {
    const user = userEvent.setup();
    render(<form>
      {name === 'Select'
        ? <Select label="Required input" name="required" isRequired errorMessage={false}><SelectItem id="local">Local</SelectItem></Select>
        : <MultiSelect label="Required input" name="required" isRequired options={[{ id: 'local', label: 'Local' }]} errorMessage={false} />}
      <button type="submit">Submit</button>
    </form>);
    const trigger = screen.getByRole('button', { name: /Required input/ });
    expect(trigger).not.toHaveAttribute('aria-invalid', 'true');
    await user.click(screen.getByRole('button', { name: 'Submit' }));
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAccessibleDescription(/Constraints not satisfied/);
  });

  it.each([Calendar, RangeCalendar])('omits blank calendar error slots without discarding zero', (Control) => {
    const { container, rerender } = render(<Control aria-label="Research dates" errorMessage={false} />);
    for (const errorMessage of [false, true, '', '  ', null]) {
      rerender(<Control aria-label="Research dates" errorMessage={errorMessage} />);
      expect(container.querySelector('.dhk-calendar__error')).toBeNull();
    }
    rerender(<Control aria-label="Research dates" errorMessage={0} />);
    expect(container.querySelector('.dhk-calendar__error')).toHaveTextContent('0');
  });

  it('treats empty fragments as absent and preserves content inside fragments', () => {
    const { rerender } = render(<Field label="Research input" hint="Helpful description" error={<>{false}</>}><Input /></Field>);
    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('Helpful description');
    rerender(<Field label="Research input" hint="Helpful description" error={<>{0}</>}><Input /></Field>);
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input).toHaveAccessibleDescription('0');
  });
});
