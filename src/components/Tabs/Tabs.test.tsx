import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Tabs, TabList, Tab, TabPanel, type TabsProps } from './Tabs';

function Example(props: Omit<TabsProps, 'children'>) {
  return <Tabs {...props}><TabList label="Research views"><Tab value="overview">Overview</Tab><Tab value="locked" disabled>Locked</Tab><Tab value="runs">Runs</Tab></TabList><TabPanel value="overview">Overview content</TabPanel><TabPanel value="locked">Locked content</TabPanel><TabPanel value="runs">Runs content</TabPanel></Tabs>;
}

describe('Tabs', () => {
  it('selects the first enabled tab without requiring defaultValue', async () => {
    const user = userEvent.setup();
    render(<Example />);
    const first = screen.getByRole('tab', { name: 'Overview' });
    expect(first).toHaveAttribute('aria-selected', 'true');
    await user.tab();
    expect(first).toHaveFocus();
  });

  it('skips disabled tabs and supports Home and End', async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.tab();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Runs' })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Runs content');
    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Runs' })).toHaveFocus();
  });

  it('leaves controlled selection to the parent', async () => {
    const user = userEvent.setup();
    const change = vi.fn();
    const { rerender } = render(<Example value="overview" onValueChange={change} />);
    await user.click(screen.getByRole('tab', { name: 'Runs' }));
    expect(change).toHaveBeenCalledWith('runs');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Overview content');
    rerender(<Example value="runs" onValueChange={change} />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Runs content');
  });

  it('supports vertical manual activation', async () => {
    const user = userEvent.setup();
    render(<Example orientation="vertical" keyboardActivation="manual" />);
    await user.tab();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('tab', { name: 'Runs' })).toHaveFocus();
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Overview content');
    await user.keyboard('{Enter}');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Runs content');
  });
});
