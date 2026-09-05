import { createRef } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './Button';
import { Modal } from '../Modal/Modal';
import { Menu, MenuItem } from '../Menu/Menu';
import { Popover } from '../Popover/Popover';
import { Tooltip } from '../Tooltip/Tooltip';
import { FileTrigger } from '../FileInput/FileInput';

describe('Button React Aria interoperability', () => {
  it('preserves native refs and onClick events and prevents disabled activation', async () => {
    const user = userEvent.setup();
    const ref = createRef<HTMLButtonElement>();
    const click = vi.fn((event) => expect(event.currentTarget).toBe(ref.current));
    const { rerender } = render(<Button ref={ref} onClick={click}>Run</Button>);
    await user.click(screen.getByRole('button', { name: 'Run' }));
    expect(click).toHaveBeenCalledTimes(1);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    rerender(<Button ref={ref} disabled onClick={click}>Run</Button>);
    await user.click(screen.getByRole('button', { name: 'Run' }));
    expect(click).toHaveBeenCalledTimes(1);
  });

  it('opens a modal by keyboard and restores focus on Escape', async () => {
    const user = userEvent.setup();
    render(<Modal trigger={<Button>Open research</Button>} title="Research details" description="Run information"><input aria-label="Title" /></Modal>);
    const trigger = screen.getByRole('button', { name: 'Open research' });
    await user.tab();
    await user.keyboard('{Enter}');
    expect(await screen.findByRole('dialog', { name: 'Research details' })).toHaveAccessibleDescription('Run information');
    await user.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
    await waitFor(() => expect(trigger).toHaveFocus());
  });

  it('preserves native attributes outside React Aria\'s filtered props', () => {
    render(<Button title="Run details" aria-busy="true" data-run-id="run-42">Run</Button>);
    const button = screen.getByRole('button', { name: 'Run' });
    expect(button).toHaveAttribute('title', 'Run details');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('data-run-id', 'run-42');
  });

  it('opens menus and activates an item once', async () => {
    const user = userEvent.setup();
    const action = vi.fn();
    render(<Menu trigger={<Button>Actions</Button>} aria-label="Actions"><MenuItem onAction={action}>Inspect</MenuItem></Menu>);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    await user.click(await screen.findByRole('menuitem', { name: 'Inspect' }));
    expect(action).toHaveBeenCalledTimes(1);
  });

  it('opens a popover from the public Button', async () => {
    const user = userEvent.setup();
    render(<Popover trigger={<Button>Filter</Button>} aria-label="Filter options">Options</Popover>);
    await user.click(screen.getByRole('button', { name: 'Filter' }));
    expect(await screen.findByRole('dialog', { name: 'Filter options' })).toBeInTheDocument();
  });

  it('connects file triggers to the native file input', async () => {
    const user = userEvent.setup();
    const click = vi.spyOn(HTMLInputElement.prototype, 'click').mockImplementation(() => {});
    render(<FileTrigger><Button>Browse</Button></FileTrigger>);
    await user.click(screen.getByRole('button', { name: 'Browse' }));
    expect(click).toHaveBeenCalledTimes(1);
  });

  it('shows a tooltip on keyboard focus', async () => {
    const user = userEvent.setup();
    render(<Tooltip content="Inspect execution" delay={0}><Button>Inspect</Button></Tooltip>);
    await user.tab();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Inspect execution');
    expect(screen.getByRole('button', { name: 'Inspect' })).toHaveAccessibleDescription('Inspect execution');
  });
});
