import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import axe from 'axe-core';
import { Meter } from './Meter';

describe('Meter', () => {
  it('exposes a named measurement with range and value', async () => {
    const { container } = render(<Meter label="Disk usage" value={78} />);
    const meter = screen.getByRole('meter', { name: 'Disk usage' });
    expect(meter).toHaveAttribute('role', 'meter');
    expect(meter).toHaveAttribute('aria-valuenow', '78');
    expect(meter).toHaveAttribute('aria-valuemin', '0');
    expect(meter).toHaveAttribute('aria-valuemax', '100');
    const result = await axe.run(container, { rules: { 'color-contrast': { enabled: false }, region: { enabled: false } } });
    expect(result.violations.map((violation) => violation.id)).toEqual([]);
  });
});
