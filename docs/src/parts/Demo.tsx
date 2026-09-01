import { useState, type ComponentType } from 'react';
import { CodeBlock, CopyButton } from './CodeBlock';

export function Demo({ component: C, source }: { component: ComponentType | null; source: string | null }) {
  const [showCode, setShowCode] = useState(false);
  if (!C) return null;

  return (
    <div className="doc-demo">
      <div className="doc-demo__stage">
        <C />
      </div>
      {source && (
        <>
          <div className="doc-demo__bar">
            <button type="button" className="doc-demo__btn" onClick={() => setShowCode((v) => !v)}>
              {showCode ? 'Hide code' : 'Show code'}
            </button>
            <span className="doc-demo__spacer" />
            <CopyButton text={source} />
          </div>
          {showCode && <CodeBlock code={source} />}
        </>
      )}
    </div>
  );
}
