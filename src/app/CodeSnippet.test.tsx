import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CodeSnippet } from './CodeSnippet';

describe('CodeSnippet', () => {
  it('renders source as text and copies the exact untrimmed source', async () => {
    const user = userEvent.setup();
    const write = vi.spyOn(navigator.clipboard, 'writeText').mockResolvedValue();
    const onCopy = vi.fn();
    const source = '  <script>danger()</script>\n';
    const { container } = render(<CodeSnippet title="config.xml" code={source} onCopy={onCopy} />);
    expect(container.querySelector('script')).toBeNull();
    expect(container.querySelector('code')?.textContent).toBe(source);
    await user.click(screen.getByRole('button', { name: 'Copy config.xml' }));
    expect(write).toHaveBeenCalledWith(source);
    expect(onCopy).toHaveBeenCalledWith(source);
    expect(screen.getByRole('status')).toHaveTextContent('Source copied');
  });

  it('reports clipboard failure without falsely reporting success', async () => {
    const user = userEvent.setup();
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('Denied'));
    const onCopy = vi.fn();
    render(<CodeSnippet code="{}" onCopy={onCopy} />);
    await user.click(screen.getByRole('button', { name: 'Copy Code snippet' }));
    expect(screen.getByRole('status')).toHaveTextContent('Clipboard unavailable');
    expect(onCopy).not.toHaveBeenCalled();
  });

  it('ignores a stale clipboard completion when the displayed source changes', async () => {
    const user = userEvent.setup();
    let finish: (() => void) | undefined;
    vi.spyOn(navigator.clipboard, 'writeText').mockImplementation(() => new Promise<void>((resolve) => { finish = resolve; }));
    const onCopy = vi.fn();
    const { rerender } = render(<CodeSnippet code="old" onCopy={onCopy} />);
    await user.click(screen.getByRole('button', { name: 'Copy Code snippet' }));
    rerender(<CodeSnippet code="new" onCopy={onCopy} />);
    finish?.();
    await waitFor(() => expect(screen.getByRole('button')).toHaveTextContent('Copy'));
    expect(onCopy).not.toHaveBeenCalled();
    expect(screen.getByRole('status')).not.toHaveTextContent('Source copied');
  });
});
