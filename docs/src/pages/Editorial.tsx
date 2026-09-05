import { Link } from "react-router-dom";
import {
  CapabilityIndex,
  CtaLink,
  FieldNote,
  NumberedItem,
  NumberedList,
  ProcessStep,
  SectionIntro,
  StatusBar,
} from "@dhaakon/ui/site";

export function Editorial() {
  return (
    <div className="doc-editorial">
      <StatusBar
        status="Field guide / 01"
        pulse={false}
        items={["Creative technology", "A composition, not a template"]}
      />
      <header className="doc-editorial-hero">
        <p className="doc-kicker">The practice behind the interface</p>
        <h1>
          I make it.
          <br />I question it.
          <br />
          <em>I build the system.</em>
        </h1>
        <div className="doc-editorial-hero__foot">
          <span className="doc-kicker">Research ↔ craft ↔ systems</span>
          <p>
            An editorial study built entirely from the same kit that runs the
            workbench. The voice changes. The language holds.
          </p>
        </div>
      </header>
      <SectionIntro
        index="01"
        eyebrow="A useful constraint"
        title="The work should make somebody more capable."
        lead="A lab is a place to ask difficult questions with working prototypes. A design system is how those prototypes become a practice others can understand, extend, and trust."
      />
      <FieldNote label="Field note 01.1">
        <p>
          Creative technology is not a style applied to software. It is a way of
          moving between a question, a material, and the thing you learn by
          making.
        </p>
      </FieldNote>
      <div className="doc-section-label">
        <span>[ 02 / The method ]</span>
        <span>Four steps. One transferable result.</span>
      </div>
      <div className="doc-process-grid">
        <ProcessStep
          index="01"
          title="Frame the question."
          summary="Name the uncertainty. Decide what a useful answer would change."
          output="A testable brief"
        />
        <ProcessStep
          index="02"
          title="Build the instrument."
          summary="Choose the smallest system that makes the question observable."
          output="A working prototype"
        />
        <ProcessStep
          index="03"
          title="Make evidence visible."
          summary="Keep parameters, provenance, and failure states close to the result."
          output="An inspectable study"
        />
        <ProcessStep
          index="04"
          title="Transfer the practice."
          summary="Document the pattern so the next person does not need its inventor."
          output="A reusable capability"
        />
      </div>
      <CapabilityIndex
        heading="06 / Working materials"
        items={[
          "Creative coding",
          "Agentic workflows",
          "Motion systems",
          "Research tools",
          "Homelab infrastructure",
          "Accessible interfaces",
        ]}
      />
      <div className="doc-section-label">
        <span>[ 03 / What travels ]</span>
        <span>The reasoning belongs with the result</span>
      </div>
      <NumberedList>
        <NumberedItem
          index="01"
          title="A prototype is a question made tangible."
          equation="Artifact ≠ answer"
          sign="−"
          defaultOpen
        >
          Show the input, the constraint, and the point where the experiment
          could fail. A convincing surface cannot substitute for an inspectable
          process.
        </NumberedItem>
        <NumberedItem
          index="02"
          title="A system needs a human-readable account."
          equation="Evidence + context"
          sign="+"
        >
          Write the field note. Keep the source close. Give an unfamiliar
          collaborator enough context to make a good next decision.
        </NumberedItem>
        <NumberedItem
          index="03"
          title="The interface should hold up under pressure."
          equation="Craft × use"
          sign="+"
        >
          Keyboard, touch, slow networks, empty collections, unexpected data,
          and reduced motion are conditions of use—not edge cases to hide from
          the demonstration.
        </NumberedItem>
      </NumberedList>
      <footer className="doc-editorial-close">
        <p className="doc-kicker">The next step is a working thing.</p>
        <h2>
          Bring a question.
          <br />
          <em>Build an instrument.</em>
        </h2>
        <div className="doc-actions">
          <Link className="doc-action" to="/workbench">
            Open the research workbench ↗
          </Link>
          <CtaLink href="https://dhaakon.com" target="_blank" rel="noreferrer">
            The dhaakon practice
          </CtaLink>
        </div>
      </footer>
      <p className="doc-p">
        Components in this composition:{" "}
        <Link to="/components/status-bar">StatusBar</Link>,{" "}
        <Link to="/components/section">SectionIntro</Link>,{" "}
        <Link to="/components/field-note">FieldNote</Link>,{" "}
        <Link to="/components/process-step">ProcessStep</Link>,{" "}
        <Link to="/components/capability-index">CapabilityIndex</Link>, and{" "}
        <Link to="/components/numbered-list">NumberedList</Link>.
      </p>
    </div>
  );
}
