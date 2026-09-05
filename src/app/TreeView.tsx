import { useEffect, useId, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
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
  onKeyDown: userOnKeyDown,
  className,
  ...rest
}: TreeViewProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set(defaultExpandedIds));
  const [focused, setFocused] = useState<string | null>(null);
  const baseId = useId();
  const treeRef = useRef<HTMLUListElement>(null);
  const search = useRef({ text: '', time: 0 });
  const rowId = (id: string) => `${baseId}-item-${encodeURIComponent(id)}`;

  // Only rows currently on screen take part in keyboard movement.
  const visible: { node: TreeNode; depth: number; parent: string | null; position: number; size: number }[] = [];
  const walk = (list: TreeNode[], depth: number, parent: string | null) => {
    for (const [index, n] of list.entries()) {
      visible.push({ node: n, depth, parent, position: index + 1, size: list.length });
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

  const isVisible = (id: string | null | undefined) => visible.some(({ node }) => node.id === id);
  const activeId = isVisible(focused) ? focused : isVisible(selectedId) ? selectedId : visible[0]?.node.id ?? null;

  useEffect(() => {
    if (activeId && document.activeElement === treeRef.current) {
      document.getElementById(`${baseId}-item-${encodeURIComponent(activeId)}`)?.scrollIntoView({ block: 'nearest' });
    }
  }, [activeId, baseId]);

  function onKeyDown(e: React.KeyboardEvent<HTMLUListElement>) {
    userOnKeyDown?.(e);
    if (e.defaultPrevented) return;
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
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          const now = Date.now();
          const char = e.key.toLocaleLowerCase();
          const previous = now - search.current.time < 700 ? search.current.text : '';
          const query = previous === char ? char : previous + char;
          search.current = { text: query, time: now };
          for (let offset = 1; offset <= visible.length; offset++) {
            const target = visible[(i + offset) % visible.length];
            const text = document.getElementById(rowId(target.node.id))?.querySelector('.dhk-tree__label')?.textContent ?? '';
            if (text.toLocaleLowerCase().startsWith(query)) {
              e.preventDefault();
              setFocused(target.node.id);
              break;
            }
          }
        }
    }
  }

  return (
    <ul
      {...rest}
      ref={treeRef}
      role="tree"
      aria-label={label}
      tabIndex={0}
      aria-activedescendant={activeId ? rowId(activeId) : undefined}
      className={cn('dhk-tree', className)}
      onKeyDown={onKeyDown}
      style={{ listStyle: 'none', margin: 0, padding: 0, ...rest.style }}
    >
      {visible.map(({ node, depth, position, size }) => {
        const hasKids = !!node.children?.length;
        const isOpen = expanded.has(node.id);
        return (
          <li key={node.id} role="none">
            <div
              role="treeitem"
              id={rowId(node.id)}
              aria-level={depth + 1}
              aria-posinset={position}
              aria-setsize={size}
              aria-expanded={hasKids ? isOpen : undefined}
              aria-selected={selectedId === node.id}
              className="dhk-tree__item"
              style={{ ['--_depth' as string]: String(depth) }}
              data-active={activeId === node.id ? '' : undefined}
              onClick={() => {
                treeRef.current?.focus();
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
