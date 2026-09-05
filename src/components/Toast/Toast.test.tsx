import { StrictMode } from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { ToastProvider, useToast } from './Toast';

function Trigger({ duration = 1000 }: { duration?: number }) {
  const { toast } = useToast();
  return <button onClick={() => toast({ title: 'Run saved', duration })}>Save</button>;
}

afterEach(() => vi.useRealTimers());

describe('Toast lifecycle', () => {
  it('cleans all scheduled timeouts on unmount including StrictMode', () => {
    vi.useFakeTimers();
    const { unmount } = render(<StrictMode><ToastProvider><Trigger /></ToastProvider></StrictMode>);
    fireEvent.click(screen.getByText('Save'));
    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });

  it('pauses while hovered or focused and resumes only the remaining duration', () => {
    vi.useFakeTimers();
    render(<ToastProvider><Trigger /></ToastProvider>);
    const region = screen.getByRole('region', { name: 'Notifications' });
    expect(region).toHaveAttribute('aria-live', 'polite');
    fireEvent.click(screen.getByText('Save'));
    act(() => vi.advanceTimersByTime(400));
    fireEvent.mouseEnter(region);
    fireEvent.focus(screen.getByRole('button', { name: 'Dismiss' }));
    act(() => vi.advanceTimersByTime(5000));
    fireEvent.mouseLeave(region);
    act(() => vi.advanceTimersByTime(5000));
    expect(screen.getByText('Run saved')).toBeInTheDocument();
    fireEvent.blur(screen.getByRole('button', { name: 'Dismiss' }), { relatedTarget: screen.getByText('Save') });
    act(() => vi.advanceTimersByTime(599));
    expect(screen.getByText('Run saved')).toBeInTheDocument();
    act(() => vi.advanceTimersByTime(1));
    expect(screen.queryByText('Run saved')).not.toBeInTheDocument();
  });

  it('keeps duration-zero notifications until dismissed', () => {
    vi.useFakeTimers();
    render(<ToastProvider><Trigger duration={0} /></ToastProvider>);
    fireEvent.click(screen.getByText('Save'));
    expect(vi.getTimerCount()).toBe(0);
    act(() => vi.advanceTimersByTime(60_000));
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(screen.queryByText('Run saved')).not.toBeInTheDocument();
  });
});
