import {
  Component,
  Suspense,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentType,
  type ErrorInfo,
  type ReactNode,
} from "react";
import { Reveal } from "@dhaakon/motion/react";
import { Alert } from "@dhaakon/ui";
import { CodeBlock, CopyButton } from "./CodeBlock";

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
    console.error(
      "[demo failed]",
      this.props.name ?? "",
      error,
      info.componentStack,
    );
  }

  render() {
    if (this.state.error) {
      return (
        <div data-demo-error={this.props.name ?? "demo"}>
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
  loadSource,
  name,
}: {
  component: ComponentType | null;
  loadSource: () => Promise<string | null>;
  name?: string;
}) {
  const [showCode, setShowCode] = useState(false);
  const [source, setSource] = useState<string | null>(null);
  const [sourceState, setSourceState] = useState<
    "idle" | "loading" | "ready" | "error"
  >("idle");
  const codeId = useId();
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  async function toggleSource() {
    setShowCode((value) => !value);
    if (sourceState === "ready" || sourceState === "loading") return;
    setSourceState("loading");
    try {
      const text = await loadSource();
      if (mounted.current) {
        setSource(text);
        setSourceState(text === null ? "error" : "ready");
      }
    } catch {
      if (mounted.current) setSourceState("error");
    }
  }
  if (!C)
    return (
      <div data-demo-error={name ?? "missing"}>
        <Alert tone="warning" title="Example not available">
          This component has no registered demonstration. Its export and
          reference remain available below.
        </Alert>
      </div>
    );

  return (
    <div className="doc-demo">
      {/* Reveal resolves immediately under reduced motion, so the demo is
          never trapped behind an animation that will not run. */}
      <Reveal
        className="doc-demo__stage"
        amount={0.15}
        margin="0px 0px -6% 0px"
      >
        <DemoErrorBoundary name={name}>
          <Suspense
            fallback={
              <p className="doc-loading" role="status">
                Loading {name} example…
              </p>
            }
          >
            <C />
          </Suspense>
        </DemoErrorBoundary>
      </Reveal>
      <>
        <div className="doc-demo__bar">
          <button
            type="button"
            className="doc-demo__btn"
            aria-expanded={showCode}
            aria-controls={codeId}
            onClick={toggleSource}
          >
            {showCode ? "Hide code" : "Show code"}
          </button>
          <span className="doc-demo__spacer" />
          {source && <CopyButton text={source} />}
        </div>
        <div id={codeId} hidden={!showCode}>
          {sourceState === "loading" && (
            <p className="doc-loading" role="status">
              Loading source…
            </p>
          )}
          {sourceState === "error" && (
            <p className="doc-loading" role="alert">
              Source could not be loaded. Close and reopen to retry.
            </p>
          )}
          {source && <CodeBlock code={source} />}
        </div>
      </>
    </div>
  );
}
