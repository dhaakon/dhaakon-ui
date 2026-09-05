import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { Dialog } from './Dialog';
import { Modal } from '../Modal/Modal';

beforeEach(() => {
  // Native modality and focus restoration are verified in Chrome, not simulated by jsdom.
  Object.defineProperty(HTMLDialogElement.prototype, 'showModal', { configurable: true, value: vi.fn(function (this: HTMLDialogElement) { this.open = true; }) });
  Object.defineProperty(HTMLDialogElement.prototype, 'close', { configurable: true, value: vi.fn(function (this: HTMLDialogElement) { this.open = false; }) });
});

describe('Dialog labels', () => {
  it('associates independent titles and descriptions without duplicate ids', () => {
    render(<><Dialog open onClose={() => {}} title="First run" description="First description" /><Dialog open onClose={() => {}} title="Second run" description="Second description" /></>);
    expect(screen.getByRole('dialog', { name: 'First run' })).toHaveAccessibleDescription('First description');
    expect(screen.getByRole('dialog', { name: 'Second run' })).toHaveAccessibleDescription('Second description');
    const ids = Array.from(document.querySelectorAll('[id]')).map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('renders description-only native dialogs with a supplied accessible name', () => {
    render(<Dialog open onClose={() => {}} hideClose aria-label="Run" description="Queued experiment" />);
    expect(screen.getByRole('dialog', { name: 'Run' })).toHaveAccessibleDescription('Queued experiment');
  });

  it('renders description-only React Aria modals with a supplied accessible name', async () => {
    render(<Modal isOpen hideClose aria-label="Run" description="Queued experiment" />);
    expect(await screen.findByRole('dialog', { name: 'Run' })).toHaveAccessibleDescription('Queued experiment');
  });
});
