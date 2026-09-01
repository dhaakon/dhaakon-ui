import { useState, type ReactNode } from 'react';

/**
 * Minimal TSX highlighter. One combined regex so the alternatives are matched
 * left to right and can never overlap — a naive multi-pass replace would
 * corrupt keywords sitting inside strings or comments.
 */
const TOKENS =
  /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|('(?:\\.|[^'\\])*'|"(?:\\.|[^"\\])*"|`(?:\\.|[^`\\])*`)|(<\/?[A-Z][\w.]*)|\b(import|from|export|default|function|return|const|let|type|interface|as|new|await|async|if|else)\b/g;

function highlight(source: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;

  TOKENS.lastIndex = 0;
  while ((m = TOKENS.exec(source))) {
    if (m.index > last) out.push(source.slice(last, m.index));
    const cls = m[1] ? 't-com' : m[2] ? 't-str' : m[3] ? 't-tag' : 't-kw';
    out.push(
      <span className={cls} key={key++}>
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < source.length) out.push(source.slice(last));
  return out;
}

export function CodeBlock({ code, standalone }: { code: string; standalone?: boolean }) {
  return (
    <pre className={`doc-code${standalone ? ' doc-code--standalone' : ''}`}>
      <code>{highlight(code.trim())}</code>
    </pre>
  );
}

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [done, setDone] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard is unavailable over plain http on some hosts; the code is
      // on screen and selectable either way, so fail quietly.
      return;
    }
    setDone(true);
    setTimeout(() => setDone(false), 1600);
  }

  return (
    <button type="button" className="doc-demo__btn" onClick={copy}>
      {done ? 'Copied' : label}
    </button>
  );
}
