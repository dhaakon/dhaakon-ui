import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { TreeView } from './TreeView';

const nodes = [{ id: 'src', label: 'Source', children: [{ id: 'button', label: 'Button' }, { id: 'input', label: 'Input' }] }, { id: 'docs', label: 'Documentation' }];
const active = (tree: HTMLElement) => document.getElementById(tree.getAttribute('aria-activedescendant')!);

describe('TreeView', () => {
  it('exposes every keyboard move through aria-activedescendant and tree metadata', async () => {
    const user = userEvent.setup();
    const select = vi.fn();
    render(<TreeView nodes={nodes} label="Files" onSelect={select} />);
    const tree = screen.getByRole('tree', { name: 'Files' });
    await user.tab();
    expect(tree).toHaveFocus();
    expect(active(tree)).toHaveTextContent('Source');
    await user.keyboard('{ArrowRight}{ArrowRight}');
    expect(active(tree)).toHaveTextContent('Button');
    expect(active(tree)).toHaveAttribute('aria-level', '2');
    expect(active(tree)).toHaveAttribute('aria-posinset', '1');
    expect(active(tree)).toHaveAttribute('aria-setsize', '2');
    await user.keyboard('{ArrowDown}{Enter}');
    expect(select).toHaveBeenCalledWith('input');
    await user.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(active(tree)).toHaveTextContent('Source');
    expect(active(tree)).toHaveAttribute('aria-expanded', 'false');
    await user.keyboard('{End}');
    expect(active(tree)).toHaveTextContent('Documentation');
    await user.keyboard('{Home}');
    expect(active(tree)).toHaveTextContent('Source');
  });

  it('supports typeahead, custom key handlers and a removed active row', async () => {
    const user = userEvent.setup();
    const keydown = vi.fn();
    const { rerender } = render(<TreeView nodes={nodes} label="Files" onKeyDown={keydown} />);
    const tree = screen.getByRole('tree');
    await user.tab();
    await user.keyboard('d');
    expect(active(tree)).toHaveTextContent('Documentation');
    expect(keydown).toHaveBeenCalled();
    rerender(<TreeView nodes={[nodes[0]]} label="Files" />);
    expect(active(tree)).toHaveTextContent('Source');
  });

  it('uses distinct DOM ids for independent trees', () => {
    render(<><TreeView nodes={nodes} label="First" /><TreeView nodes={nodes} label="Second" /></>);
    const ids = screen.getAllByRole('treeitem').map((element) => element.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
