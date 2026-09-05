import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Button as AriaButton, type ButtonProps as AriaButtonProps } from 'react-aria-components';
import { cn } from '../../lib/cn';

export type ButtonVariant = 'primary' | 'accent' | 'outline' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** React Aria press interaction. Existing native onClick handlers remain supported. */
  onPress?: AriaButtonProps['onPress'];
  isDisabled?: boolean;
  /** Announce pending work while keeping the button focusable. */
  isPending?: boolean;
  /** Visual weight. `primary` is solid ink → accent on hover. */
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Stretch to the container width. */
  block?: boolean;
  /** Icon before the label. Pass a 1em-sized element (e.g. a lucide icon). */
  iconStart?: ReactNode;
  /** Icon after the label. */
  iconEnd?: ReactNode;
}

/**
 * The dhaakon button: sharp corners, uppercase Plex Condensed label,
 * one decisive hover state.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', block, iconStart, iconEnd, className, type = 'button', children, disabled, isDisabled, onPress, isPending, ...rest },
  ref,
) {
  // RAC widens focus targets to Element for polymorphic controls. This wrapper
  // always renders a button, retaining the existing native public event types.
  const ariaProps = rest as AriaButtonProps;
  return (
    <AriaButton
      ref={ref}
      type={type}
      isDisabled={disabled || isDisabled}
      isPending={isPending}
      onPress={onPress}
      render={(buttonProps) => <button {...rest} {...buttonProps} />}
      className={cn(
        'dhk-btn',
        `dhk-btn--${variant}`,
        size !== 'md' && `dhk-btn--${size}`,
        block && 'dhk-btn--block',
        className,
      )}
      {...ariaProps}
    >
      {iconStart != null && <span className="dhk-btn__icon" aria-hidden>{iconStart}</span>}
      {children}
      {iconEnd != null && <span className="dhk-btn__icon" aria-hidden>{iconEnd}</span>}
    </AriaButton>
  );
});
