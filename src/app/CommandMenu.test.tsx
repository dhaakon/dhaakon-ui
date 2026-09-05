import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CommandMenu } from './CommandMenu';

describe('CommandMenu', () => {
  it('filters commands and executes the keyboard-selected action once', async () => {
    const user = userEvent.setup();
    const action = vi.fn();
    const openChange = vi.fn();
    render(<CommandMenu isOpen hotkey={false} onOpenChange={openChange} commands={[{ id: 'dashboard', label: 'Résumé dashboard', onAction: action }, { id: 'settings', label: 'Settings' }]} />);
    const search = await screen.findByRole('searchbox', { name: 'Search commands' });
    await user.type(search, 'resume');
    await waitFor(() => expect(screen.getAllByRole('option')).toHaveLength(1));
    expect(search).toHaveAttribute('aria-controls');
    await user.keyboard('{ArrowDown}{Enter}');
    expect(action).toHaveBeenCalledTimes(1);
    expect(openChange).toHaveBeenCalledWith(false);
  });

  it('shows an empty state and calls the latest hotkey callback', async () => {
    const user = userEvent.setup();
    const old = vi.fn();
    const current = vi.fn();
    const { rerender } = render(<CommandMenu isOpen={false} onOpenChange={old} commands={[]} />);
    rerender(<CommandMenu isOpen={false} onOpenChange={current} commands={[]} />);
    await user.keyboard('{Control>}k{/Control}');
    expect(old).not.toHaveBeenCalled();
    expect(current).toHaveBeenCalledWith(true);
    rerender(<CommandMenu isOpen commands={[]} onOpenChange={current} />);
    expect(await screen.findByText('No matching command')).toBeInTheDocument();
  });
});
