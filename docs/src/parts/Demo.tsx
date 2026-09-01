import { Component, useState, type ComponentType, type ErrorInfo, type ReactNode } from 'react';
import { Reveal } from '@dhaakon/motion/react';
import { Alert } from '@dhaakon/ui';
import { CodeBlock, CopyButton } from './CodeBlock';

/**
 * Keeps one broken demo from taking the page down with it.
 *
 * A demo that throws during render would otherwise unmount the whole app and
 * leave a blank screen — the reader cannot tell a broken example from a broken
 * site. The `data-demo-error` attribute is what `scripts/check-routes.mjs`
 * looks for when it walks every route.
 */
class DemoErrorBoundary extends Component<
  { children: ReactNode; name?: string },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Surfaced to the console so the route check and the browser agree.
    console.error('[demo failed]', this.props.name ?? '', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div data-demo-error={this.props.name ?? 'demo'}>
          <Alert tone="danger" title="This example failed to render">
            <code className="doc-inline">{this.state.error.message}</code>
          </Alert>
        </div>
      );
    }
    return this.props.children;
  }
}

export function Demo({
  component: C,
  source,
  name,
}: {
  component: ComponentType | null;
  source: string | null;
  name?: string;
}) {
  const [showCode, setShowCode] = useState(false);
  if (!C) return null;

  return (
    <div className="doc-demo">
      {/* Reveal resolves immediately under reduced motion, so the demo is
          never trapped behind an animation that will not run. */}
      <Reveal className="doc-demo__stage" amount={0.15} margin="0px 0px -6% 0px">
        <DemoErrorBoundary name={name}>
          <C />
        </DemoErrorBoundary>
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
