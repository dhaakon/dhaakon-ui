import { StrictMode } from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { DhaakonProvider } from './DhaakonProvider';
import { Modal } from '../Modal/Modal';

describe('DhaakonProvider', () => {
  it('provides explicit theme, density and locale without mutating the document theme', () => {
    render(<DhaakonProvider theme="dark" density="compact" locale="ar-AE"><span>Instrument</span></DhaakonProvider>);
    const scope = screen.getByText('Instrument').closest('.dhk-root');
    expect(scope).toHaveAttribute('data-theme', 'dark');
    expect(scope).toHaveAttribute('data-density', 'compact');
    expect(scope).toHaveAttribute('dir', 'rtl');
    expect(scope).toHaveAttribute('lang', 'ar-AE');
    expect(document.documentElement).not.toHaveAttribute('data-theme');
  });

  it('supports independent nested scopes and cleans all portal hosts under StrictMode', () => {
    const view = render(<StrictMode><DhaakonProvider theme="dark"><DhaakonProvider theme="light">Nested</DhaakonProvider></DhaakonProvider></StrictMode>);
    expect(screen.getByText('Nested')).toHaveClass('dhk-light');
    expect(document.querySelectorAll('[data-dhk-portal]')).toHaveLength(2);
    view.unmount();
    expect(document.querySelectorAll('[data-dhk-portal]')).toHaveLength(0);
  });

  it('renders Aria overlays in the provider-owned body host', async () => {
    const view = render(<DhaakonProvider theme="dark"><Modal isOpen title="Instrument details">Metadata</Modal></DhaakonProvider>);
    expect((await screen.findByRole('dialog')).closest('[data-dhk-portal]')).not.toBeNull();
    view.unmount();
    expect(document.querySelectorAll('[data-dhk-portal]')).toHaveLength(0);
  });
});
