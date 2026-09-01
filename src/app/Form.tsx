import { type HTMLAttributes, type ReactNode } from 'react';
import { cn } from '../lib/cn';

export interface FormSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Put the heading above the fields instead of beside them. */
  stacked?: boolean;
  children: ReactNode;
}

/**
 * A titled block of form fields, heading beside the inputs.
 *
 * The two-column split collapses to stacked under 760px — a 18rem description
 * column beside a 12rem input is worse than either alone.
 */
export function FormSection({
  title,
  description,
  stacked,
  className,
  children,
  ...rest
}: FormSectionProps) {
  return (
    <section
      className={cn('dhk-formsection', stacked && 'dhk-formsection--stacked', className)}
      {...rest}
    >
      <div>
        <h3 className="dhk-formsection__title">{title}</h3>
        {description != null && <p className="dhk-formsection__desc">{description}</p>}
      </div>
      <div className="dhk-formsection__fields">{children}</div>
    </section>
  );
}

export interface SettingRowProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** The control — a `<Switch>`, `<Select>`, or a `<Button>`. */
  control: ReactNode;
}

/**
 * Label, explanation and one control on a ruled row — the settings-page
 * workhorse.
 *
 * The control carries its own accessible name (a `<Switch>`'s label, a
 * `<Select>`'s label). The title here is layout, so give the control an
 * `aria-label` when it has no visible one of its own.
 */
export function SettingRow({ title, description, control, className, ...rest }: SettingRowProps) {
  return (
    <div className={cn('dhk-settingrow', className)} {...rest}>
      <div className="dhk-settingrow__text">
        <div className="dhk-settingrow__title">{title}</div>
        {description != null && <p className="dhk-settingrow__desc">{description}</p>}
      </div>
      <div className="dhk-settingrow__control">{control}</div>
    </div>
  );
}
