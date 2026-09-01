import { useEffect, useMemo, useState, type ReactNode } from 'react';
import {
  Autocomplete,
  Input as AriaInput,
  ListBox,
  ListBoxItem,
  ListBoxSection,
  Header,
  Modal,
  ModalOverlay,
  Dialog,
  useFilter,
} from 'react-aria-components';
import { SearchIcon } from '../lib/icons';

export interface Command {
  id: string;
  label: string;
  /** Grouping heading — "Navigate", "Actions". */
  group?: string;
  icon?: ReactNode;
  /** Displayed shortcut, e.g. `G then D`. Not bound for you. */
  shortcut?: string;
  onAction?: () => void;
}

export interface CommandMenuProps {
  commands: Command[];
  /** Controlled open state. Omit to let the ⌘K/Ctrl-K binding own it. */
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Bind ⌘K / Ctrl-K to open. Default true. */
  hotkey?: boolean;
  placeholder?: string;
  emptyText?: ReactNode;
}

/**
 * A ⌘K palette: type to filter, arrows to move, Enter to run.
 *
 * Filtering uses React Aria's locale-aware `useFilter` rather than
 * `String.includes`, so accents and case fold the way the user's language
 * expects.
 */
export function CommandMenu({
  commands,
  isOpen,
  onOpenChange,
  hotkey = true,
  placeholder = 'Search commands…',
  emptyText = 'No matching command',
}: CommandMenuProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen ?? internalOpen;

  const setOpen = (v: boolean) => {
    if (isOpen === undefined) setInternalOpen(v);
    onOpenChange?.(v);
  };

  useEffect(() => {
    if (!hotkey) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hotkey, open]);

  const { contains } = useFilter({ sensitivity: 'base' });

  const groups = useMemo(() => {
    const by = new Map<string, Command[]>();
    for (const c of commands) {
      const k = c.group ?? '';
      if (!by.has(k)) by.set(k, []);
      by.get(k)!.push(c);
    }
    return [...by.entries()];
  }, [commands]);

  return (
    <ModalOverlay
      isOpen={open}
      onOpenChange={setOpen}
      isDismissable
      className="dhk-modal-overlay"
      style={{ alignItems: 'flex-start', paddingTop: '12vh' }}
    >
      <Modal className="dhk-modal dhk-command">
        <Dialog aria-label="Command menu" style={{ outline: 'none', display: 'contents' }}>
          <Autocomplete filter={contains}>
            <div className="dhk-command__search">
              <SearchIcon className="dhk-command__icon" />
              <AriaInput autoFocus placeholder={placeholder} aria-label="Search commands" />
            </div>
            <ListBox
              className="dhk-command__list"
              aria-label="Commands"
              renderEmptyState={() => <div className="dhk-listbox__empty">{emptyText}</div>}
            >
              {groups.map(([group, items]) => (
                <ListBoxSection key={group || 'ungrouped'}>
                  {group && <Header className="dhk-menu__section-label">{group}</Header>}
                  {items.map((c) => (
                    <ListBoxItem
                      key={c.id}
                      id={c.id}
                      textValue={c.label}
                      className="dhk-command__item"
                      onAction={() => {
                        c.onAction?.();
                        setOpen(false);
                      }}
                    >
                      {c.icon != null && <span className="dhk-menu__item-icon" aria-hidden>{c.icon}</span>}
                      <span>{c.label}</span>
                      {c.shortcut && <kbd className="dhk-command__shortcut">{c.shortcut}</kbd>}
                    </ListBoxItem>
                  ))}
                </ListBoxSection>
              ))}
            </ListBox>
          </Autocomplete>
          <div className="dhk-command__foot">
            <span>↑↓ navigate</span>
            <span>↵ run</span>
            <span>esc close</span>
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
