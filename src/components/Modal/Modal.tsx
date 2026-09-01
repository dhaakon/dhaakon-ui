import { type ReactNode } from 'react';
import {
  DialogTrigger,
  Modal as AriaModal,
  ModalOverlay,
  Dialog as AriaDialog,
  Heading,
  Button as AriaButton,
  type ModalOverlayProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { XIcon } from '../../lib/icons';

export interface ModalProps extends Omit<ModalOverlayProps, 'children' | 'className'> {
  /** The control that opens it. Omit when driving `isOpen` yourself. */
  trigger?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Receives a `close` function, so footer buttons can dismiss the modal. */
  footer?: ReactNode | ((close: () => void) => ReactNode);
  hideClose?: boolean;
  className?: string;
}

/**
 * A modal overlay with entry and exit animations.
 *
 * `Dialog` is the native `<dialog>` and should stay the default — it gets
 * focus trapping and inertness from the platform. Reach for `Modal` when you
 * want a trigger-driven overlay that animates out, which `<dialog>` cannot do
 * without extra work.
 */
export function Modal({
  trigger,
  title,
  description,
  children,
  footer,
  hideClose,
  className,
  ...rest
}: ModalProps) {
  const body = (
    <ModalOverlay {...rest} className="dhk-modal-overlay">
      <AriaModal className={cn('dhk-modal', className)}>
        <AriaDialog className="dhk-dialog__inner" style={{ outline: 'none' }}>
          {({ close }) => (
            <>
              {(title != null || !hideClose) && (
                <div className="dhk-dialog__header">
                  <div>
                    {title != null && <Heading slot="title" className="dhk-dialog__title">{title}</Heading>}
                    {description != null && <p className="dhk-dialog__desc">{description}</p>}
                  </div>
                  {!hideClose && (
                    <AriaButton className="dhk-dialog__close" aria-label="Close" onPress={close}>
                      <XIcon />
                    </AriaButton>
                  )}
                </div>
              )}
              {children != null && <div className="dhk-dialog__body">{children}</div>}
              {footer != null && (
                <div className="dhk-dialog__footer">
                  {typeof footer === 'function' ? footer(close) : footer}
                </div>
              )}
            </>
          )}
        </AriaDialog>
      </AriaModal>
    </ModalOverlay>
  );

  return trigger != null ? (
    <DialogTrigger>
      {trigger}
      {body}
    </DialogTrigger>
  ) : (
    body
  );
}
