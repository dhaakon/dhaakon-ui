import { type FormEvent, type ReactNode } from 'react';
import { cn } from '../lib/cn';
import { LogoMark } from '../components/Logo/Logo';

export interface LoginPanelProps {
  brand?: ReactNode;
  mark?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  /** The fields — usually `<Field>` + `<Input>` pairs. */
  children: ReactNode;
  /** Submit button and anything beside it. */
  submit: ReactNode;
  /** Between the fields and the button: "remember me", "forgot password". */
  secondary?: ReactNode;
  /** Under the panel: "No account? Sign up". */
  footer?: ReactNode;
  /** An `<Alert>` for a failed attempt. */
  error?: ReactNode;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  /** Centre it in the viewport. Off when embedding in your own layout. */
  fullPage?: boolean;
  className?: string;
}

/**
 * A sign-in panel: brand, heading, fields, submit.
 *
 * A real `<form>` with a real submit button, so Enter works and password
 * managers recognise it — the two things a div-and-onClick version breaks.
 */
export function LoginPanel({
  brand,
  mark = <LogoMark size={20} />,
  title = 'Sign in',
  description,
  children,
  submit,
  secondary,
  footer,
  error,
  onSubmit,
  fullPage = true,
  className,
}: LoginPanelProps) {
  const panel = (
    <div className={cn('dhk-authpanel', className)}>
      {brand != null && (
        <div className="dhk-authpanel__brand">
          {mark}
          {brand}
        </div>
      )}
      <div>
        <h1 className="dhk-authpanel__title">{title}</h1>
        {description != null && <p className="dhk-authpanel__desc">{description}</p>}
      </div>
      {error}
      <form className="dhk-authpanel__form" onSubmit={onSubmit}>
        {children}
        {secondary != null && <div className="dhk-authpanel__row">{secondary}</div>}
        {submit}
      </form>
      {footer != null && <div className="dhk-authpanel__foot">{footer}</div>}
    </div>
  );

  return fullPage ? <div className="dhk-authpage">{panel}</div> : panel;
}
