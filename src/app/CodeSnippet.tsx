import { useEffect, useId, useRef, useState } from 'react';
import { Button } from '../components/Button/Button';
import { cn } from '../lib/cn';

export interface CodeSnippetProps {
  code: string;
  title?: string;
  /** Informational language label, not a claim of parsing or syntax highlighting. */
  language?: string;
  showLineNumbers?: boolean;
  maxHeight?: number | string;
  /** Called only after the clipboard write succeeds. */
  onCopy?: (code: string) => void;
  className?: string;
}

/** Plain-text code, never injected HTML; exact-source copy with a visible failure state. */
export function CodeSnippet({
  code,
  title = 'Code snippet',
  language = 'text',
  showLineNumbers = true,
  maxHeight = 400,
  onCopy,
  className,
}: CodeSnippetProps) {
  const titleId = useId();
  const [status, setStatus] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle');
  const generation = useRef(0);
  useEffect(() => {
    generation.current += 1;
    setStatus('idle');
    return () => { generation.current += 1; };
  }, [code]);

  async function copy() {
    const attempt = ++generation.current;
    setStatus('copying');
    try {
      if (!globalThis.navigator?.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(code);
    } catch {
      if (attempt === generation.current) setStatus('failed');
      return;
    }
    if (attempt !== generation.current) return;
    setStatus('copied');
    onCopy?.(code);
  }

  return (
    <section className={cn('dhk-code', className)} aria-labelledby={titleId}>
      <header className="dhk-code__header">
        <h3 id={titleId}>{title}</h3>
        <span className="dhk-code__language">{language}</span>
        <Button variant="ghost" size="sm" onClick={copy} disabled={status === 'copying'} aria-label={`Copy ${title}`}>
          {status === 'copied' ? 'Copied' : status === 'copying' ? 'Copying…' : 'Copy'}
        </Button>
      </header>
      <div className="dhk-code__scroll" style={{ maxHeight }} tabIndex={0} role="region" aria-label={`${title} source`}>
        {showLineNumbers && <pre aria-hidden="true" className="dhk-code__numbers">{code.split('\n').map((_, i) => i + 1).join('\n')}</pre>}
        <pre className="dhk-code__source"><code>{code}</code></pre>
      </div>
      <p className="dhk-code__status" role="status">
        {status === 'copied' ? 'Source copied to clipboard.' : status === 'failed' ? 'Clipboard unavailable. Select the source text to copy it manually.' : '\u00a0'}
      </p>
    </section>
  );
}
