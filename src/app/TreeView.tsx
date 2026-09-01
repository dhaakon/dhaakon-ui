import { useState, type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { ChevronRightIcon } from '../lib/icons';

export interface TreeNode {
  id: string;
  label: ReactNode;
  /** Trailing detail — a size, a count, a status. */
  meta?: ReactNode;
  icon?: ReactNode;
  children?: TreeNode[];
}

export interface TreeViewProps extends Omit<HTMLAttributes<HTMLUListElement>, 'onSelect'> {
  nodes: TreeNode[];
  label: string;
  defaultExpandedIds?: string[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}

/**
 * A nested, expandable tree — file paths, org hierarchies, JSON.
 *
 * Implements the WAI-ARIA tree pattern by hand: one tab stop for the whole
 * tree, then ↑↓ to move between visible rows, → to open or descend, ← to
 * close or go to the parent.
 */
export function TreeView({
  nodes,
  label,
  defaultExpandedIds = [],
  selectedId,
  onSelect,
  className,
  ...rest
}: TreeViewProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpandedIds));
  const [focused, setFocused] = useState<string | null>(null);

  // Only rows currently on screen take part in keyboard movement.
  const visible: { node: TreeNode; depth: number; parent: string | null }[] = [];
  const walk = (list: TreeNode[], depth: number, parent: string | null) => {
    for (const n of list) {
      visible.push({ node: n, depth, parent });
      if (n.children?.length && expanded.has(n.id)) walk(n.children, depth + 1, n.id);
    }
  };
  walk(nodes, 0, null);

  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const activeId = focused ?? selectedId ?? visible[0]?.node.id ?? null;

  function onKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    const i = visible.findIndex((v) => v.node.id === activeId);
    if (i < 0) return;
    const row = visible[i];
    const hasKids = !!row.node.children?.length;
    const isOpen = expanded.has(row.node.id);

    const move = (to: number) => {
      const t = visible[to];
      if (t) setFocused(t.node.id);
    };

    switch (e.key) {
      case 'ArrowDown': e.preventDefault(); move(i + 1); break;
      case 'ArrowUp': e.preventDefault(); move(i - 1); break;
      case 'Home': e.preventDefault(); move(0); break;
      case 'End': e.preventDefault(); move(visible.length - 1); break;
      case 'ArrowRight':
        e.preventDefault();
        if (hasKids && !isOpen) toggle(row.node.id);
        else if (hasKids) move(i + 1);
        break;
      case 'ArrowLeft':
        e.preventDefault();
        if (hasKids && isOpen) toggle(row.node.id);
        else if (row.parent) setFocused(row.parent);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (hasKids) toggle(row.node.id);
        onSelect?.(row.node.id);
        break;
    }
  }

  return (
    <ul
      role="tree"
      aria-label={label}
      tabIndex={0}
      className={cn('dhk-tree', className)}
      onKeyDown={onKeyDown}
      style={{ listStyle: 'none', margin: 0, padding: 0 }}
      {...rest}
    >
      {visible.map(({ node, depth }) => {
        const hasKids = !!node.children?.length;
        const isOpen = expanded.has(node.id);
        return (
          <li key={node.id} role="none">
            <div
              role="treeitem"
              aria-level={depth + 1}
              aria-expanded={hasKids ? isOpen : undefined}
              aria-selected={selectedId === node.id}
              className="dhk-tree__item"
              style={{ ['--_depth' as string]: String(depth) }}
              data-active={activeId === node.id ? '' : undefined}
              onClick={() => {
                setFocused(node.id);
                if (hasKids) toggle(node.id);
                onSelect?.(node.id);
              }}
            >
              <span className="dhk-tree__chevron" aria-hidden>
                {hasKids ? <ChevronRightIcon /> : null}
              </span>
              {node.icon != null && <span aria-hidden>{node.icon}</span>}
              <span className="dhk-tree__label">{node.label}</span>
              {node.meta != null && <span className="dhk-tree__meta">{node.meta}</span>}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

