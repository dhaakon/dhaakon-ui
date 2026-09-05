import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { AppShell } from './AppShell';

describe('AppShell landmarks', () => {
  it('preserves a main landmark by default', () => {
    render(<AppShell>Application</AppShell>);
    expect(screen.getByRole('main')).toHaveTextContent('Application');
  });

  it('can be embedded without creating a nested main', () => {
    render(<main><AppShell contentAs="section" contentLabel="Application example">Preview</AppShell></main>);
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getByRole('region', { name: 'Application example' })).toHaveTextContent('Preview');
  });
});
