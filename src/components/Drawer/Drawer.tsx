import { useId, type ReactElement, type ReactNode } from 'react';
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Modal,
  ModalOverlay,
  type ModalOverlayProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { XIcon } from '../../lib/icons';

export interface DrawerProps extends Omit<ModalOverlayProps, 'children' | 'className'> {
  title: string;
  description?: ReactNode;
  children: ReactNode;
  /** Use the kit Button or React Aria Button. For a plain native button, control open state instead. */
  trigger?: ReactElement;
  placement?: 'start' | 'end';
  footer?: ReactNode | ((close: () => void) => ReactNode);
  className?: string;
}

/** Modal inspector with logical-side placement, focus containment and a separately scrolling body. */
export function Drawer({
  title,
  description,
  children,
  trigger,
  placement = 'end',
  footer,
  className,
  isOpen,
  defaultOpen,
  onOpenChange,
  isDismissable = true,
  ...rest
}: DrawerProps) {
  const descriptionId = useId();
  const state = { isOpen, defaultOpen, onOpenChange };
  const overlay = (
    <ModalOverlay
      {...rest}
      {...(trigger ? {} : state)}
      isDismissable={isDismissable}
      className="dhk-drawer-overlay"
      data-placement={placement}
    >
      <Modal className={cn('dhk-drawer', className)} data-placement={placement}>
        <Dialog className="dhk-drawer__dialog" aria-describedby={description != null ? descriptionId : undefined}>
          {({ close }) => (
            <>
              <header className="dhk-drawer__header">
                <div>
                  <Heading slot="title" className="dhk-drawer__title">{title}</Heading>
                  {description != null && <p id={descriptionId} className="dhk-drawer__description">{description}</p>}
                </div>
                <Button className="dhk-btn dhk-btn--ghost dhk-drawer__close" aria-label={`Close ${title}`} onPress={close}>
                  <XIcon />
                </Button>
              </header>
              <div className="dhk-drawer__body">{children}</div>
              {footer != null && <footer className="dhk-drawer__footer">{typeof footer === 'function' ? footer(close) : footer}</footer>}
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );

  return trigger ? <DialogTrigger {...state}>{trigger}{overlay}</DialogTrigger> : overlay;
}
