import { type ReactNode } from 'react';
import {
  DisclosureGroup,
  Disclosure,
  DisclosurePanel,
  Button as AriaButton,
  Heading,
  type DisclosureGroupProps,
  type DisclosureProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { ChevronDownIcon } from '../../lib/icons';

export interface AccordionProps extends Omit<DisclosureGroupProps, 'className'> {
  className?: string;
}

/**
 * A stack of collapsible sections.
 *
 * Single-open by default; pass `allowsMultipleExpanded` to let several stay
 * open at once. React Aria wires `aria-expanded`/`aria-controls` and keeps
 * panel content out of the tab order while collapsed.
 */
export function Accordion({ className, ...rest }: AccordionProps) {
  return <DisclosureGroup {...rest} className={cn('dhk-accordion', className)} />;
}

export interface AccordionItemProps extends Omit<DisclosureProps, 'className' | 'children'> {
  /** The always-visible header. */
  title: ReactNode;
  children: ReactNode;
  /** Heading level for the trigger — match the surrounding document outline. */
  level?: 2 | 3 | 4 | 5 | 6;
  className?: string;
}

export function AccordionItem({
  title,
  children,
  level = 3,
  className,
  ...rest
}: AccordionItemProps) {
  return (
    <Disclosure {...rest} className={cn('dhk-accordion__item', className)}>
      <Heading level={level}>
        <AriaButton slot="trigger" className="dhk-accordion__trigger">
          <span>{title}</span>
          <ChevronDownIcon className="dhk-accordion__chevron" />
        </AriaButton>
      </Heading>
      <DisclosurePanel className="dhk-accordion__panel">{children}</DisclosurePanel>
    </Disclosure>
  );
}
