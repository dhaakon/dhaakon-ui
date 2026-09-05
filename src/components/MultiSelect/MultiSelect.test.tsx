import { useState } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MultiSelect } from './MultiSelect';

const options = [
  { id: 'cache', label: 'Café cache' },
  { id: 'worker', label: 'Render worker' },
  { id: 'archive', label: 'Archive', isDisabled: true },
];

describe('MultiSelect', () => {
  it('associates the label, description and invalid message with the control', () => {
    render(<MultiSelect label="Services" description="Choose deployment targets." errorMessage="Choose at least two." options={options} />);
    const trigger = screen.getByRole('button', { name: /Services/ });
    expect(trigger).toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAccessibleDescription(/Choose deployment targets/);
    expect(trigger).toHaveAccessibleDescription(/Choose at least two/);
    expect(screen.getByText('Choose at least two.')).toBeVisible();
  });

  it('filters accent-insensitively and preserves uncontrolled selections in form data', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<form aria-label="Deployment"><MultiSelect label="Services" name="services" options={options} defaultValue={['worker']} onChange={onChange} /></form>);
    const trigger = screen.getByRole('button', { name: /Services/ });
    await user.click(trigger);
    await user.type(screen.getByRole('searchbox', { name: 'Search Services' }), 'cafe');
    expect(screen.getByRole('option', { name: 'Café cache' })).toBeVisible();
    expect(screen.queryByRole('option', { name: 'Render worker' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('option', { name: 'Café cache' }));
    expect(onChange).toHaveBeenLastCalledWith(['worker', 'cache']);
    await user.keyboard('{Escape}');
    expect(screen.getByRole('searchbox', { name: 'Search Services' })).toHaveValue('');
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(trigger).toHaveTextContent('Render worker and Café cache');
    expect(new FormData(screen.getByRole('form') as HTMLFormElement).getAll('services').sort()).toEqual(['cache', 'worker']);
  });

  it('supports controlled selection and prevents disabled option selection', async () => {
    const user = userEvent.setup();
    function Example() {
      const [value, setValue] = useState<string[]>([]);
      return <><MultiSelect label="Services" value={value} onChange={setValue} options={options} /><output aria-label="Selected keys">{value.join(',')}</output></>;
    }
    render(<Example />);
    await user.click(screen.getByRole('button', { name: /Services/ }));
    const disabled = screen.getByRole('option', { name: 'Archive' });
    expect(disabled).toHaveAttribute('aria-disabled', 'true');
    await user.click(disabled);
    expect(screen.getByLabelText('Selected keys')).toBeEmptyDOMElement();
    await user.click(screen.getByRole('option', { name: 'Render worker' }));
    expect(screen.getByLabelText('Selected keys')).toHaveTextContent('worker');
    await user.click(screen.getByRole('option', { name: 'Render worker' }));
    expect(screen.getByLabelText('Selected keys')).toBeEmptyDOMElement();
  });

  it('supports keyboard selection and native form reset', async () => {
    const user = userEvent.setup();
    render(<form aria-label="Deployment"><MultiSelect label="Services" options={options} defaultValue={['worker']} /><button type="reset">Reset form</button></form>);
    const trigger = screen.getByRole('button', { name: /Services/ });
    await user.tab();
    expect(trigger).toHaveFocus();
    await user.keyboard('{Enter}');
    const search = screen.getByRole('searchbox', { name: 'Search Services' });
    await user.type(search, 'cafe');
    await user.keyboard('{ArrowDown}{Enter}');
    await user.keyboard('{Escape}{Escape}');
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    expect(trigger).toHaveTextContent('Café cache');
    await user.click(screen.getByRole('button', { name: 'Reset form' }));
    expect(trigger).toHaveTextContent('Render worker');
    expect(trigger).not.toHaveTextContent('Café cache');
  });

  it('announces native required validation on the visible trigger and clears it on form reset', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
    render(<form aria-label="Required deployment" onSubmit={onSubmit}>
      <MultiSelect label="Required services" name="services" options={options} isRequired description="Choose a deployment target." />
      <button type="submit">Submit deployment</button>
      <button type="reset">Reset deployment</button>
    </form>);
    const trigger = screen.getByRole('button', { name: /Required services/ });
    expect(trigger).not.toHaveAttribute('aria-invalid', 'true');
    expect(trigger).toHaveAccessibleDescription('Choose a deployment target.');
    await user.click(screen.getByRole('button', { name: 'Submit deployment' }));
    expect(onSubmit).not.toHaveBeenCalled();
    await waitFor(() => expect(trigger).toHaveAttribute('aria-invalid', 'true'));
    expect(trigger).toHaveAccessibleDescription(/Constraints not satisfied/);
    await user.click(screen.getByRole('button', { name: 'Reset deployment' }));
    await waitFor(() => expect(trigger).not.toHaveAttribute('aria-invalid', 'true'));
    expect(trigger).toHaveAccessibleDescription('Choose a deployment target.');
    await user.click(trigger);
    await user.click(screen.getByRole('option', { name: 'Render worker' }));
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('listbox')).not.toBeInTheDocument());
    await user.click(screen.getByRole('button', { name: 'Submit deployment' }));
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(trigger).not.toHaveAttribute('aria-invalid', 'true');
  });
});
