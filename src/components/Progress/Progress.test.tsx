import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import axe from 'axe-core';
import { Progress, ProgressRing } from './Progress';

describe('Progress', () => {
  it('names determinate, indeterminate and ring variants', async () => {
    const { container } = render(<><Progress label="Indexing" value={19} /><Progress label="Pulling image" isIndeterminate /><ProgressRing aria-label="Compositing" value={71} /></>);
    expect(screen.getByRole('progressbar', { name: 'Indexing' })).toHaveAttribute('aria-valuenow', '19');
    expect(screen.getByRole('progressbar', { name: 'Pulling image' })).not.toHaveAttribute('aria-valuenow');
    expect(screen.getByRole('progressbar', { name: 'Compositing' })).toHaveAttribute('aria-valuenow', '71');
    const result = await axe.run(container, { rules: { 'color-contrast': { enabled: false }, region: { enabled: false } } });
    expect(result.violations.map((violation) => violation.id)).toEqual([]);
  });
});
