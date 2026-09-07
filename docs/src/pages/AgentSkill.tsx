import { Alert } from "@dhaakon/ui";
import { CodeBlock } from "../parts/CodeBlock";
import { MOTION_DOCS_URL } from "../lib/registry";

const install = `# From a dhaakon-motion checkout
mkdir -p "\${CODEX_HOME:-$HOME/.codex}/skills"
ln -s "$PWD/skills/dhaakon-ui-motion" "\${CODEX_HOME:-$HOME/.codex}/skills/dhaakon-ui-motion"`;

const example = `Use $dhaakon-ui-motion to build a research run inspector.
Reuse Dhaakon UI primitives or app composites, use semantic tokens,
choose CSS-native or timeline motion deliberately, and verify keyboard,
reduced-motion, interruption, and teardown behavior.`;

export function AgentSkill() {
  return (
    <>
      <div className="doc-kicker">Agent workflow / UI + motion</div>
      <h1 className="doc-h1">Give the agent the actual system.</h1>
      <p className="doc-lede">
        <code className="doc-inline">$dhaakon-ui-motion</code> is the
        version-controlled Codex skill for composing this kit with Dhaakon
        Motion. It teaches selection, ownership, accessibility and
        verification—not a fixed page template.
      </p>

      <Alert tone="info" title="One canonical copy">
        The skill source lives in{" "}
        <code className="doc-inline">
          dhaakon-motion/skills/dhaakon-ui-motion
        </code>
        . Install that folder by symlink so documentation and agent behavior
        cannot drift through copied files.
      </Alert>

      <h2 className="doc-h2">What the skill changes</h2>
      <div className="doc-grid doc-agent-grid">
        <article>
          <span className="doc-grid__name">01 / Select</span>
          <p className="doc-grid__sum">
            Check current exports first. Choose core primitives, application
            composites, or editorial patterns by semantics and product context.
          </p>
        </article>
        <article>
          <span className="doc-grid__name">02 / Coordinate</span>
          <p className="doc-grid__sum">
            UI state owns meaning and focus. CSS motion owns surface
            presentation. Transport owns exact time. Optional Wasm evaluates
            numeric graphics data.
          </p>
        </article>
        <article>
          <span className="doc-grid__name">03 / Verify</span>
          <p className="doc-grid__sum">
            Exercise actual keyboard outcomes, reduced motion, interruption and
            lifecycle cleanup, then report the package versions that were truly
            used.
          </p>
        </article>
      </div>

      <h2 className="doc-h2">Install into Codex</h2>
      <p className="doc-p">
        Run this at the canonical motion repository root, then start a new agent
        session to refresh discovery.
      </p>
      <CodeBlock standalone code={install} />

      <h2 className="doc-h2">Invoke with a concrete outcome</h2>
      <CodeBlock standalone code={example} />

      <h2 className="doc-h2">Its architectural boundary</h2>
      <CodeBlock
        standalone
        code={`@dhaakon/ui          semantics, components, runtime CSS tokens
@dhaakon/ui/app      operational and research composites
@dhaakon/ui/site     expressive dhaakon.com editorial patterns
cssMotion            native CSS presentation for ordinary UI state
motion + gesture     reactive and input-controlled values
Timeline/Transport   coordinated cues, seeking, outputs, exact frames
/compiled + Wasm     opt-in numeric evaluation for Canvas / Three`}
      />
      <p className="doc-p">
        CSS animation is not a blanket GPU guarantee, and Wasm is not a
        renderer. That distinction keeps ordinary interfaces simple while
        leaving a measured path for dense graphics work.
      </p>
      <div className="doc-actions">
        <a
          className="doc-action doc-action--accent"
          href={`${MOTION_DOCS_URL}/agent-skill`}
        >
          Read the motion-side skill guide ↗
        </a>
        <a className="doc-action" href={`${MOTION_DOCS_URL}/css-ui`}>
          Open the CSS + UI lab ↗
        </a>
      </div>
      <p className="doc-p">
        The skill preserves task authority: using it does not permit package
        upgrades, Git pushes, publishing or deployment unless the user asks for
        those operations.
      </p>
    </>
  );
}
