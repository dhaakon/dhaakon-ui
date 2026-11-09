import type { ReactNode } from "react";
import { Alert, Table, type Column } from "@dhaakon/ui";
import { CodeBlock } from "../parts/CodeBlock";
import { MOTION_DOCS_URL } from "../lib/registry";

const claudeInstall = `# From a dhaakon-motion checkout — available in every project
mkdir -p ~/.claude/skills
ln -s "$PWD/skills/dhaakon-ui-motion" ~/.claude/skills/dhaakon-ui-motion

# …or only inside one consumer project (commit the link or add it to .gitignore)
mkdir -p /path/to/app/.claude/skills
ln -s "$PWD/skills/dhaakon-ui-motion" /path/to/app/.claude/skills/dhaakon-ui-motion`;

const codexInstall = `# From a dhaakon-motion checkout
mkdir -p "\${CODEX_HOME:-$HOME/.codex}/skills"
ln -s "$PWD/skills/dhaakon-ui-motion" "\${CODEX_HOME:-$HOME/.codex}/skills/dhaakon-ui-motion"`;

const task = `build a research run inspector.
Reuse Dhaakon UI primitives or app composites, use semantic tokens,
choose CSS-native or timeline motion deliberately, and verify keyboard,
reduced-motion, interruption, and teardown behavior.`;

type ToolRow = { aspect: string; claude: ReactNode; codex: ReactNode };

const code = (text: string) => <code className="doc-inline">{text}</code>;

const toolRows: ToolRow[] = [
  {
    aspect: "Personal install",
    claude: code("~/.claude/skills/"),
    codex: (
      <>
        {code("$CODEX_HOME/skills/")} (default {code("~/.codex")})
      </>
    ),
  },
  {
    aspect: "Per-project install",
    claude: <>{code(".claude/skills/")} in the consumer repo</>,
    codex: "—",
  },
  {
    aspect: "Invoke",
    claude: <>{code("/dhaakon-ui-motion")}, or automatically from the task</>,
    codex: <>{code("$dhaakon-ui-motion")} in the prompt</>,
  },
  {
    aspect: "Display metadata",
    claude: <>{code("SKILL.md")} frontmatter</>,
    codex: code("agents/openai.yaml"),
  },
];

const toolColumns: Column<ToolRow>[] = [
  { key: "aspect", header: "", width: "24%" },
  { key: "claude", header: "Claude Code", cell: (row) => row.claude },
  { key: "codex", header: "Codex", cell: (row) => row.codex },
];

const claudeExample = `/dhaakon-ui-motion ${task}`;
const codexExample = `Use $dhaakon-ui-motion to ${task}`;

export function AgentSkill() {
  return (
    <>
      <div className="doc-kicker">Agent workflow / UI + motion</div>
      <h1 className="doc-h1">Give the agent the actual system.</h1>
      <p className="doc-lede">
        <code className="doc-inline">$dhaakon-ui-motion</code> is the
        version-controlled agent skill for composing this kit with Dhaakon
        Motion. The same folder works in Claude Code and Codex. It teaches
        selection, ownership, accessibility and verification—not a fixed page
        template.
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

      <h2 className="doc-h2">Install</h2>
      <p className="doc-p">
        Both tools read the same <code className="doc-inline">SKILL.md</code>{" "}
        and references; only the install location and invocation differ. Run the
        commands at the motion repository root, then start a new session so
        skill discovery refreshes.
      </p>
      <Table
        dense
        hoverable={false}
        caption="Where each tool looks for the skill"
        columns={toolColumns}
        data={toolRows}
        rowKey={(row) => row.aspect}
      />

      <h3 className="dhk-eyebrow doc-agent-tool">Claude Code</h3>
      <CodeBlock standalone code={claudeInstall} />
      <p className="doc-p">
        Claude Code loads the skill when a request matches its description, or
        on demand with the slash command. Each kit repository ships a{" "}
        <code className="doc-inline">CLAUDE.md</code> that imports its{" "}
        <code className="doc-inline">AGENTS.md</code>, so Claude Code follows
        the same repository rules as Codex.
      </p>
      <CodeBlock standalone code={claudeExample} />

      <h3 className="dhk-eyebrow doc-agent-tool">Codex</h3>
      <CodeBlock standalone code={codexInstall} />
      <p className="doc-p">
        Name the skill in the prompt. Codex reads{" "}
        <code className="doc-inline">AGENTS.md</code> natively, and{" "}
        <code className="doc-inline">agents/openai.yaml</code> supplies the
        skill&rsquo;s display name and default prompt.
      </p>
      <CodeBlock standalone code={codexExample} />

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
