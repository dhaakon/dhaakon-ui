import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '../Button/Button';
import { describe, expect, it, vi } from 'vitest';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('opens from a trigger, names/describes its dialog and restores focus on Escape', async () => {
    const user = userEvent.setup();
    render(<Drawer trigger={<Button>Inspect run</Button>} title="Run 0042" description="Recorded local experiment."><p>Sample count: 48.</p></Drawer>);
    const trigger = screen.getByRole('button', { name: 'Inspect run' });
    await user.click(trigger);
    const dialog = screen.getByRole('dialog', { name: 'Run 0042' });
    expect(dialog).toHaveAccessibleDescription('Recorded local experiment.');
    expect(within(dialog).getByText('Sample count: 48.')).toBeVisible();
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('supports controlled open state and a footer close callback', async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Drawer title="Artifact" isOpen onOpenChange={onOpenChange} placement="start" footer={(close) => <Button onPress={close}>Done inspecting</Button>}><p>manifest.json</p></Drawer>);
    await user.click(screen.getByRole('button', { name: 'Done inspecting' }));
    expect(onOpenChange).toHaveBeenCalledWith(false);
    // Controlled state must remain owned by the caller.
    expect(screen.getByRole('dialog')).toBeVisible();
  });
});
