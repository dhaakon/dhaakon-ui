import { type HTMLAttributes, type SVGProps } from 'react';
import { cn } from '../../lib/cn';

export type LogoVariant = 'solid' | 'outline';

export interface LogoMarkProps extends Omit<SVGProps<SVGSVGElement>, 'children'> {
  /** Rendered size in px. Default 24. */
  size?: number;
  /**
   * `solid` is the filled square from dhaakon.com. `outline` drops the square
   * and draws the letterform in `currentColor`, for tight or coloured chrome.
   */
  variant?: LogoVariant;
  /** Drop the accent dot. */
  hideDot?: boolean;
  /**
   * Accessible name. Omit inside a `<Logo>` or any element that already names
   * the brand — a mark repeated as "Dhaakon Dhaakon" helps nobody.
   */
  title?: string;
}

/**
 * The dhaakon.com mark: a D monogram in a square, with the accent dot.
 *
 * Colours come from tokens rather than the source SVG's literals, so the
 * square inverts in dark mode instead of disappearing into the ground. The
 * dot stays accent in both.
 */
export function LogoMark({
  size = 24,
  variant = 'solid',
  hideDot,
  title,
  className,
  ...rest
}: LogoMarkProps) {
  const solid = variant === 'solid';
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={cn('dhk-logomark', className)}
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
      {...rest}
    >
      {solid && <rect width="64" height="64" fill="var(--dhk-text)" />}
      <path
        d="M8 8h48v48H8z"
        fill="none"
        stroke={solid ? 'var(--dhk-bg)' : 'currentColor'}
        strokeOpacity={solid ? 1 : 0.35}
        strokeWidth="2"
      />
      <path
        d="M18 17h10c11 0 18 5 18 15s-7 15-18 15H18V17zm9 23c7 0 11-2 11-8s-4-8-11-8h-1v16h1z"
        fill={solid ? 'var(--dhk-bg)' : 'currentColor'}
      />
      {!hideDot && <circle cx="50" cy="14" r="5" fill="var(--dhk-accent)" />}
    </svg>
  );
}

export interface LogoProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Mark height in px. The wordmark scales with it. */
  size?: number;
  variant?: LogoVariant;
  /** Mark only, no wordmark. */
  markOnly?: boolean;
  hideDot?: boolean;
  /** Override the wordmark text. */
  wordmark?: string;
  /** Renders as a link when set. */
  href?: string;
}

/**
 * Mark plus wordmark — the lockup for headers, sign-in panels and footers.
 *
 * One accessible name for the pair: the mark is decorative and the wordmark
 * carries the text, so it is announced once as "Dhaakon".
 */
export function Logo({
  size = 22,
  variant = 'solid',
  markOnly,
  hideDot,
  wordmark = 'Dhaakon',
  href,
  className,
  ...rest
}: LogoProps) {
  const inner = (
    <>
      <LogoMark size={size} variant={variant} hideDot={hideDot} />
      {!markOnly && <span className="dhk-logo__word">{wordmark}</span>}
    </>
  );
  const shared = {
    className: cn('dhk-logo', className),
    // With the wordmark present the text names it; mark-only needs a label.
    'aria-label': markOnly ? wordmark : undefined,
  };

  return href != null ? (
    <a href={href} {...shared} {...(rest as HTMLAttributes<HTMLAnchorElement>)}>{inner}</a>
  ) : (
    <span {...shared} {...(rest as HTMLAttributes<HTMLSpanElement>)}>{inner}</span>
  );
}
