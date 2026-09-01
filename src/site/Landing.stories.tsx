import type { CSSProperties } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBar } from './StatusBar';
import { SectionIntro } from './Section';
import { DisplayHeading } from './DisplayHeading';
import { LogoMarquee } from './LogoMarquee';
import { NumberedList, NumberedItem } from './NumberedList';
import { ProgramCard } from './ProgramCard';
import { ProcessStep } from './ProcessStep';
import { OfferCard } from './OfferCard';
import { Segmented } from './Segmented';
import { CapabilityIndex } from './CapabilityIndex';
import { FieldNote } from './FieldNote';
import { CtaLink } from './CtaLink';
import { SiteFooter } from './SiteFooter';
import { Marker } from './Marker';

const meta: Meta = {
  title: 'Site/Landing Page',
  parameters: { layout: 'fullscreen', controls: { disable: true }, a11y: { test: 'todo' } },
};
export default meta;
type Story = StoryObj;

const wrap: CSSProperties = {
  maxWidth: '72rem',
  margin: '0 auto',
  padding: '0 var(--dhk-gutter)',
};
const section: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--dhk-space-8)',
  padding: 'var(--dhk-space-12) 0',
  borderTop: '1px solid var(--dhk-border)',
};

/** A single-page recomposition of dhaakon.com from `@dhaakon/ui/site`. */
export const Dhaakon: Story = {
  render: () => (
    <div>
      <div style={wrap}>
        <StatusBar status="Listening" items={['Brooklyn, NY', 'Remote / N. America', 'AI / Craft / Systems / People']} />
      </div>

      {/* hero */}
      <div style={{ ...wrap, padding: 'var(--dhk-space-12) var(--dhk-gutter) var(--dhk-space-12)' }}>
        <div className="dhk-eyebrow" style={{ marginBottom: 'var(--dhk-space-8)' }}>
          00 / 06 — Intro — Navigate the practice
        </div>
        <DisplayHeading
          annotations={[
            { text: 'AI', glyph: 'arrow-ne', x: 4, y: -12 },
            { text: 'craft', glyph: 'arrow-se', x: 40, y: 104 },
            { text: 'team', glyph: 'target', x: 66, y: -8 },
            { text: 'own', x: 88, y: 100 },
          ]}
        >
          Make AI a craft<br />your team owns.
        </DisplayHeading>
        <p style={{ maxWidth: '34rem', marginTop: 'var(--dhk-space-8)', color: 'var(--dhk-text-muted)', lineHeight: 1.6 }}>
          Hi. I&rsquo;m David Poyner, a creative technologist and educator. I help
          creative organizations turn AI into a craft their teams own.
        </p>
        <CtaLink href="#approach" glyph="↘">See the system</CtaLink>
      </div>

      <div style={{ ...wrap, padding: 0 }}>
        <LogoMarquee logos={['Ford', 'Meta', 'Google', 'Samsung', 'Coca-Cola', "McDonald's", 'NYU Tisch', 'Hornet', 'BCG Digital Ventures', 'Gallagher & Associates', 'Barnard College']} />
      </div>

      {/* 01 — approach */}
      <div style={wrap}>
        <section style={section} id="approach">
          <SectionIntro
            index="01"
            eyebrow="The approach"
            title="The problem is rarely the tool."
            subtitle="Why creative AI programs stall."
            lead="Every organization I walk into already has the licenses. What they don't have is a process that survives contact with a deadline."
          />
          <NumberedList>
            <NumberedItem index="01" title="Tools were rolled out. The process wasn't." equation="Adoption ≠ impact" sign="−" signal="Failure signal 01" defaultOpen>
              Seats get purchased, a lunch-and-learn happens, and everyone returns to the workflow they already knew. Nothing downstream changed.
            </NumberedItem>
            <NumberedItem index="02" title="The pilot never leaves the innovation team." equation="Prototype ≠ practice" sign="+">
              A small group builds something genuinely good. It never becomes a standard because nobody wrote down the pattern.
            </NumberedItem>
            <NumberedItem index="03" title="Training came from someone who's never shipped." equation="Theory ≠ trust" sign="+">
              Creatives know within ten minutes whether the person teaching has done the work.
            </NumberedItem>
            <NumberedItem index="04" title="Capability lives in one person's head." equation="Expertise ≠ system" sign="+">
              One enthusiast becomes the bottleneck. When they leave, the capability leaves with them.
            </NumberedItem>
          </NumberedList>
        </section>

        {/* 02 — programs */}
        <section style={section}>
          <SectionIntro
            index="02"
            eyebrow="What I run"
            title="Four programs. One durable outcome."
            subtitle="Your team gets better for good."
            lead="The work composes: diagnose the system, build fluency on real work, then transfer the practice inside."
          />
          <div style={{ display: 'grid', gap: 'var(--dhk-space-5)', gridTemplateColumns: 'repeat(auto-fit, minmax(19rem, 1fr))' }}>
            <ProgramCard index={1} total={4} duration="1–3 weeks" name="Audit" description="Trace the pipeline as it exists; find the seams where AI creates leverage without breaking trust." points={['Workflow map', 'Capability baseline']} outcome="A clear picture of where the leverage is." />
            <ProgramCard index={2} total={4} duration="8–16 weeks" name="Enable Core" description="A working cohort moves from curiosity to production fluency on live projects from your pipeline." points={['12–30 practitioners on real briefs', 'Live sessions + reviewed work', 'Champions trained to run the next cohort']} outcome="A fluent team, documented standards, and someone inside who can teach it." />
            <ProgramCard index={3} total={4} duration="Ongoing" name="Rebuild" description="Reset the pipeline around the new practice once the cohort proves it." points={['Standards + templates', 'Tooling and review gates']} outcome="A pipeline that assumes the capability." />
            <ProgramCard index={4} total={4} duration="Quarterly" name="Align" description="Keep leadership and practice pointed the same way as the medium moves." points={['Executive readouts', 'Roadmap revisions']} outcome="Sustained direction." />
          </div>
          <FieldNote label="Field note 02.1">
            Experience is part of the method. A tool rollout only changes the work when practitioners
            trust the person teaching it, the learning survives real deadlines, and the pattern is
            documented well enough to travel without its inventor.
          </FieldNote>
        </section>

        {/* 03 — process */}
        <section style={section}>
          <SectionIntro index="03" eyebrow="How it moves" title="The engagement is a transfer." subtitle="From outside expertise to internal craft." lead="The engagement ends when your team no longer needs me. That is the design constraint, not a concession." />
          <div>
            <ProcessStep index="01" title="Listen" summary="Sit with the people doing the work and trace the pipeline as it exists." output="Workflow map + capability baseline" />
            <ProcessStep index="02" title="Build" summary="Design the program against current briefs, actual deadlines, your approved stack." output="Custom curriculum + working patterns" />
            <ProcessStep index="03" title="Practice" summary="Cohorts work in the open; each round turns individual tricks into repeatable craft." output="Reviewed work + documented standards" />
            <ProcessStep index="04" title="Transfer" summary="Internal champions run the pattern themselves." output="Champion handoff + next-cohort plan" />
          </div>
        </section>

        {/* 04 — engagement */}
        <section style={section}>
          <SectionIntro index="04" eyebrow="Ways to work" title="Choose the depth, not a pile of days." subtitle="Find the signal. Build the change." />
          <div>
            <OfferCard index="01" title="Diagnostic & Keynote" subtitle="The best front door" description="A talk that shifts the room, or a focused assessment that tells leadership where they actually stand." includes={['Keynote or all-hands', 'Full-day team intensive', 'Or a 2–3 week capability audit', 'Written assessment and roadmap']} cta={{ label: "Let's engage and discuss details", href: '#' }} />
            <OfferCard index="02" title="Capability Program" subtitle="Core offering" description="Diagnose, design the curriculum, run the cohort on live work, and transfer the program to internal champions." includes={['8–16 weeks, cohort of 12–30', 'Documented standards and templates', 'Executive readouts at midpoint and close', 'Milestone billing, 40% to start']} cta={{ label: "Let's engage and discuss details", href: '#' }} />
            <OfferCard index="03" title="Embedded Practice Lead" subtitle="Fractional" description="Fractional head of creative technology for organizations that need the function in the room while the new process sets." includes={['4–6 days of senior time per month', 'Standing weekly working session', 'Async review of creative and technical work', 'Three-month minimum, quarterly renewal']} cta={{ label: "Let's engage and discuss details", href: '#' }} />
          </div>
        </section>

        {/* 05 — proof */}
        <section style={section}>
          <SectionIntro index="05" eyebrow="Why this works" title="Three credentials. One practice." subtitle="The program needs all three." />
          <Segmented
            aria-label="Credentials"
            options={[
              { value: 'educator', label: 'Educator' },
              { value: 'cross', label: 'Cross-industry' },
              { value: 'enterprise', label: 'Enterprise + studio' },
            ]}
          />
          <CapabilityIndex
            heading="08 capabilities"
            items={['Creative AI workflows', 'Agentic prototyping', 'Design-to-code', 'Generative image + video', 'Virtual production', 'Curriculum + cohorts', 'Responsible adoption', 'Creative systems']}
          />
          <div style={{ display: 'flex', gap: 'var(--dhk-space-3)', flexWrap: 'wrap', fontFamily: 'var(--dhk-font-condensed)', textTransform: 'uppercase', letterSpacing: 'var(--dhk-tracking-label)', fontSize: 'var(--dhk-text-2xs)', color: 'var(--dhk-text-muted)' }}>
            <span>Cannes Lion Bronze</span><Marker glyph="plus" tone="accent" />
            <span>AAM Muse Gold</span><Marker glyph="plus" tone="accent" />
            <span>Webby Honoree</span>
          </div>
        </section>
      </div>

      <div style={wrap}>
        <SiteFooter email="david@dhaakon.com" copyright="© 2026 David Poyner" items={['Approach', 'Programs', 'Process', 'Engagement', 'Proof']} />
      </div>
    </div>
  ),
};
