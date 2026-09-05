import { useEffect, useRef, useState, type ReactNode } from 'react';

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
    <pre tabIndex={0} className={`doc-code${standalone ? ' doc-code--standalone' : ''}`}>
      <code>{highlight(code.trim())}</code>
    </pre>
  );
}

export function CopyButton({ text, label = 'Copy' }: { text: string; label?: string }) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const generation = useRef(0);
  useEffect(() => {
    generation.current += 1;
    setStatus('idle');
    return () => { generation.current += 1; };
  }, [text]);

  async function copy() {
    const attempt = ++generation.current;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      if (attempt === generation.current) setStatus('failed');
      return;
    }
    if (attempt === generation.current) setStatus('copied');
  }

  return (
    <span>
      <button type="button" className="doc-demo__btn" onClick={copy}>
        {status === 'copied' ? 'Copied' : label}
      </button>
      <span role="status" style={{ fontSize: '0.75rem', color: 'var(--dhk-text-muted)' }}>
        {status === 'failed' ? 'Clipboard unavailable; select the code to copy.' : status === 'copied' ? ' Copied to clipboard.' : ''}
      </span>
    </span>
  );
}
