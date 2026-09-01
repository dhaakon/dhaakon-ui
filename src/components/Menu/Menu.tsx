import { type ReactNode } from 'react';
import {
  MenuTrigger,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuSection,
  Popover,
  Separator,
  Header,
  type MenuProps as AriaMenuProps,
  type MenuItemProps as AriaMenuItemProps,
  type MenuTriggerProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';

export interface MenuProps<T extends object> extends Omit<AriaMenuProps<T>, 'className'> {
  /** The control that opens the menu — usually a `<Button>`. */
  trigger: ReactNode;
  placement?: 'bottom start' | 'bottom end' | 'top start' | 'top end' | 'bottom' | 'top';
  className?: string;
  triggerProps?: Omit<MenuTriggerProps, 'children'>;
}

/**
 * A dropdown action menu. Typeahead, arrow keys, Esc-to-close and focus
 * restoration come from React Aria.
 *
 * ```tsx
 * <Menu trigger={<Button>Actions</Button>}>
 *   <MenuItem onAction={…}>Rename</MenuItem>
 * </Menu>
 * ```
 */
export function Menu<T extends object>({
  trigger,
  placement = 'bottom start',
  className,
  triggerProps,
  ...rest
}: MenuProps<T>) {
  return (
    <MenuTrigger {...triggerProps}>
      {trigger}
      <Popover className="dhk-popover" placement={placement}>
        <AriaMenu {...rest} className={cn('dhk-menu', className)} />
      </Popover>
    </MenuTrigger>
  );
}

export interface MenuItemProps extends Omit<AriaMenuItemProps, 'className' | 'children'> {
  children?: ReactNode;
  /** Leading icon; give it a `1em` box. */
  icon?: ReactNode;
  /** Destructive styling for delete/revoke actions. */
  danger?: boolean;
  className?: string;
}

export function MenuItem({ children, icon, danger, className, ...rest }: MenuItemProps) {
  return (
    <AriaMenuItem
      {...rest}
      className={cn('dhk-menu__item', danger && 'dhk-menu__item--danger', className)}
    >
      {icon != null && (
        <span className="dhk-menu__item-icon" aria-hidden>
          {icon}
        </span>
      )}
      {children}
    </AriaMenuItem>
  );
}

export function MenuSeparator() {
  return <Separator className="dhk-menu__separator" />;
}

export interface MenuGroupProps<T extends object> {
  label?: ReactNode;
  children: ReactNode;
  items?: Iterable<T>;
}

/** A labelled block of items inside a menu. */
export function MenuGroup<T extends object>({ label, children, items }: MenuGroupProps<T>) {
  return (
    <MenuSection items={items}>
      {label != null && <Header className="dhk-menu__section-label">{label}</Header>}
      {children as never}
    </MenuSection>
  );
}
