import { useState, type ReactNode } from 'react';
import { Modal } from '../components/Modal/Modal';
import { Button } from '../components/Button/Button';
import { Field } from '../components/Field/Field';
import { Input } from '../components/Input/Input';
import { Alert } from '../components/Alert/Alert';

export interface ConfirmDialogProps {
  trigger?: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  /** Extra warning shown above the confirm control. */
  warning?: ReactNode;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode;
  onConfirm?: () => void;
  /**
   * Require this exact string to be typed before confirming. Use for
   * irreversible actions — deleting a team, dropping a volume.
   */
  confirmText?: string;
  destructive?: boolean;
}

/**
 * A confirmation modal, optionally gated on typing an exact phrase.
 *
 * `confirmText` is the difference between "are you sure?" — which people click
 * through without reading — and an action they have to demonstrate intent for.
 * Reserve it for things that cannot be undone.
 */
export function ConfirmDialog({
  trigger,
  isOpen,
  onOpenChange,
  title,
  description,
  warning,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  confirmText,
  destructive = true,
}: ConfirmDialogProps) {
  const [typed, setTyped] = useState('');
  const locked = confirmText != null && typed !== confirmText;

  return (
    <Modal
      trigger={trigger}
      isOpen={isOpen}
      onOpenChange={(o) => {
        if (!o) setTyped('');
        onOpenChange?.(o);
      }}
      title={title}
      description={description}
      footer={(close) => (
        <>
          <Button variant="ghost" onClick={close}>{cancelLabel}</Button>
          <Button
            variant={destructive ? 'accent' : 'primary'}
            disabled={locked}
            onClick={() => {
              onConfirm?.();
              close();
            }}
          >
            {confirmLabel}
          </Button>
        </>
      )}
    >
      <div style={{ display: 'grid', gap: 'var(--dhk-space-4)' }}>
        {warning != null && <Alert tone="danger" title="This cannot be undone">{warning}</Alert>}
        {confirmText != null && (
          <Field label={<>Type <code className="dhk-mono">{confirmText}</code> to confirm</>}>
            <Input
              mono
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              placeholder={confirmText}
              autoComplete="off"
            />
          </Field>
        )}
      </div>
    </Modal>
  );
}
