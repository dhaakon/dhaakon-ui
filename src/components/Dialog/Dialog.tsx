import { useEffect, useRef, type ReactNode, type MouseEvent } from 'react';
import { cn } from '../../lib/cn';
import { XIcon } from '../../lib/icons';

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  /** Footer slot — typically a right-aligned Button row. */
  footer?: ReactNode;
  /** Hide the header close button. */
  hideClose?: boolean;
  /** Clicking the backdrop closes the dialog. Default: true. */
  dismissOnBackdrop?: boolean;
  className?: string;
}

/**
 * Modal dialog built on the native `<dialog>` element — real focus trapping,
 * `Esc` to close, inert background, no portal. Controlled via `open`.
 */
export function Dialog({
  open,
  onClose,
  title,
  description,
  children,
  footer,
  hideClose,
  dismissOnBackdrop = true,
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    else if (!open && el.open) el.close();
  }, [open]);

  function onBackdropClick(e: MouseEvent<HTMLDialogElement>) {
    if (!dismissOnBackdrop || e.target !== ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const outside =
      e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    if (outside) onClose();
  }

  return (
    <dialog
      ref={ref}
      className={cn('dhk-dialog', className)}
      aria-labelledby={title != null ? 'dhk-dialog-title' : undefined}
      aria-describedby={description != null ? 'dhk-dialog-desc' : undefined}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={onBackdropClick}
    >
      <div className="dhk-dialog__inner">
        {(title != null || !hideClose) && (
          <div className="dhk-dialog__header">
            <div>
              {title != null && (
                <h2 className="dhk-dialog__title" id="dhk-dialog-title">
                  {title}
                </h2>
              )}
              {description != null && (
                <p className="dhk-dialog__desc" id="dhk-dialog-desc">
                  {description}
                </p>
              )}
            </div>
            {!hideClose && (
              <button type="button" className="dhk-dialog__close" aria-label="Close" onClick={onClose}>
                <XIcon />
              </button>
            )}
          </div>
        )}
        {children != null && <div className="dhk-dialog__body">{children}</div>}
        {footer != null && <div className="dhk-dialog__footer">{footer}</div>}
      </div>
    </dialog>
  );
}
