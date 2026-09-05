import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { VerificationCodeInput } from './VerificationCodeInput';

describe('VerificationCodeInput', () => {
  it('provides one named native OTP input and completes only changed codes', async () => {
    const user = userEvent.setup();
    const complete = vi.fn();
    render(<VerificationCodeInput onComplete={complete} />);
    const input = screen.getByRole('textbox', { name: 'Verification code' });
    expect(screen.getAllByRole('textbox')).toHaveLength(1);
    expect(input).toHaveAttribute('autocomplete', 'one-time-code');
    await user.type(input, '123456');
    expect(complete).toHaveBeenCalledExactlyOnceWith('123456');
    await user.paste('123456');
    expect(complete).toHaveBeenCalledTimes(1);
  });

  it('supports native middle edits, clearing and full-code paste over a partial value', async () => {
    const user = userEvent.setup();
    render(<VerificationCodeInput defaultValue="123456" />);
    const input = screen.getByRole('textbox');
    await user.click(input);
    (input as HTMLInputElement).setSelectionRange(2, 3);
    await user.keyboard('9');
    expect(input).toHaveValue('129456');
    await user.clear(input);
    expect(input).toHaveValue('');
    await user.type(input, '12');
    await user.paste('654 321');
    expect(input).toHaveValue('654321');
  });

  it('preserves controlled ownership and associates errors', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const { rerender } = render(<VerificationCodeInput value="12" onChange={change} errorMessage="Code expired" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAccessibleDescription('Code expired');
    await user.type(input, '3');
    expect(change).toHaveBeenCalledWith('123');
    expect(input).toHaveValue('12');
    rerender(<VerificationCodeInput value="" isDisabled />);
    expect(input).toHaveValue('');
    expect(input).toBeDisabled();
  });
});
