import { useState, type ComponentType } from 'react';
import { Reveal } from '@dhaakon/motion/react';
import { CodeBlock, CopyButton } from './CodeBlock';

export function Demo({ component: C, source }: { component: ComponentType | null; source: string | null }) {
  const [showCode, setShowCode] = useState(false);
  if (!C) return null;

  return (
    <div className="doc-demo">
      {/* Reveal resolves immediately under reduced motion, so the demo is
          never trapped behind an animation that will not run. */}
      <Reveal className="doc-demo__stage" amount={0.15} margin="0px 0px -6% 0px">
        <C />
      </Reveal>
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
