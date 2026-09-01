import { type ReactNode } from 'react';

/**
 * Renders `backtick` spans in registry copy as inline code. The guidance
 * strings are authored as plain text, so nothing else is interpreted.
 */
export function Prose({
  children,
  className,
  as: Tag = 'p',
}: {
  children: string;
  className?: string;
  /** `<p>` by default; use `span` inside a link or another paragraph. */
  as?: 'p' | 'span';
}) {
  const out: ReactNode[] = [];
  const parts = children.split(/`([^`]+)`/g);

  parts.forEach((part, i) => {
    if (!part) return;
    // Odd indices are the captured groups — the text between backticks.
    out.push(
      i % 2 === 1 ? (
        <code className="doc-inline" key={i}>{part}</code>
      ) : (
        <span key={i}>{part}</span>
      ),
    );
  });

  return <Tag className={className}>{out}</Tag>;
}
