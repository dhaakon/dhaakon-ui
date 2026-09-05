import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { TelemetryChart } from './TelemetryChart';

describe('TelemetryChart', () => {
  it('exposes supplied units and exact values in a semantic fallback table', () => {
    render(<TelemetryChart title="Render time" labels={['a', 'b']} unit="ms" series={[{ id: 'cpu', label: 'CPU', values: [1.000001, 2] }]} showDataTable />);
    expect(screen.getByRole('img')).toHaveAccessibleName(/Render time/);
    const table = screen.getByRole('table');
    expect(within(table).getByRole('columnheader', { name: 'CPU' })).toBeInTheDocument();
    expect(within(table).getByRole('cell', { name: '1.000001 ms' })).toBeVisible();
    expect(screen.getByRole('slider')).toHaveAccessibleName('Inspect sample a');
    fireEvent.change(screen.getByRole('slider'), { target: { value: '1' } });
    expect(screen.getByRole('slider')).toHaveAttribute('aria-valuetext', 'b');
  });

  it('toggles plotted series without discarding their accessible data', async () => {
    const user = userEvent.setup();
    const { container } = render(<TelemetryChart title="Samples" labels={['a', 'b']} series={[{ id: 'one', label: 'One', values: [1, 2] }]} showDataTable />);
    expect(container.querySelectorAll('.dhk-chart__svg path')).toHaveLength(1);
    const button = screen.getByRole('button', { name: /One/ });
    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
    expect(container.querySelectorAll('.dhk-chart__svg path')).toHaveLength(0);
    expect(screen.getByRole('table')).toHaveTextContent('One');
    expect(screen.getByText('All series hidden')).toBeInTheDocument();
  });

  it('leaves missing-data gaps and keeps huge finite datasets geometrically finite', () => {
    const { container } = render(<TelemetryChart title="Extremes" labels={['a', 'b', 'c', 'd']} series={[{ id: 'data', label: 'Observed', values: [-1e308, null, 1e308, Number.NaN] }]} showDataTable />);
    const path = container.querySelector('.dhk-chart__svg path');
    expect(path?.getAttribute('d')).not.toMatch(/NaN|Infinity/);
    expect(path?.getAttribute('d')?.match(/M/g)).toHaveLength(2);
    expect(screen.getAllByRole('cell', { name: 'No sample' })).toHaveLength(2);
    expect(container.querySelector('.dhk-chart__svg')?.textContent).not.toMatch(/Infinity|NaN/);
  });

  it('renders empty and single-sample datasets without misleading connecting paths', () => {
    const { container, rerender } = render(<TelemetryChart title="Empty" labels={[]} series={[]} />);
    expect(screen.getByText('No samples supplied')).toBeInTheDocument();
    expect(screen.queryByRole('slider')).not.toBeInTheDocument();
    rerender(<TelemetryChart title="Single" labels={['only']} series={[{ id: 'data', label: 'Observed', values: [0] }]} />);
    expect(container.querySelectorAll('.dhk-chart__svg circle')).toHaveLength(1);
    expect(screen.getByRole('slider')).toBeDisabled();
  });
});
