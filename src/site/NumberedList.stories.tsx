import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberedList, NumberedItem } from './NumberedList';
import { Segmented } from './Segmented';
import { ProgramCard } from './ProgramCard';
import { OfferCard } from './OfferCard';

const meta: Meta = {
  title: 'Site/Blocks',
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

export const FailureSignals: Story = {
  render: () => (
    <NumberedList>
      <NumberedItem
        index="01"
        title="Tools were rolled out. The process wasn't."
        equation="Adoption ≠ impact"
        sign="−"
        signal="Failure signal 01"
        defaultOpen
      >
        Seats get purchased, a lunch-and-learn happens, and everyone returns to the
        workflow they already knew. Adoption metrics look fine. Nothing downstream changed.
      </NumberedItem>
      <NumberedItem index="02" title="The pilot never leaves the innovation team." equation="Prototype ≠ practice" sign="+">
        A small group builds something genuinely good. It never becomes a standard because
        nobody wrote down the pattern, and production was never in the room.
      </NumberedItem>
      <NumberedItem index="03" title="Training came from someone who's never shipped." equation="Theory ≠ trust" sign="+">
        Creatives know within ten minutes whether the person teaching has done the work.
        If they haven't, the room closes and the program is dead on arrival.
      </NumberedItem>
      <NumberedItem index="04" title="Capability lives in one person's head." equation="Expertise ≠ system" sign="+">
        One enthusiast becomes the bottleneck for the whole organization. When they leave,
        the capability leaves with them, and you start over.
      </NumberedItem>
    </NumberedList>
  ),
};

export const SegmentedIndex: Story = {
  render: () => (
    <Segmented
      aria-label="Credentials"
      options={[
        { value: 'practitioner', label: 'Practitioner' },
        { value: 'educator', label: 'Educator' },
        { value: 'systems', label: 'Systems builder' },
      ]}
    />
  ),
};

export const Programs: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))' }}>
      <ProgramCard
        index={2}
        total={4}
        duration="8–16 weeks"
        name="Cohort Enablement"
        description="A working cohort moves from curiosity to production fluency on live projects from your pipeline, not toy exercises."
        points={[
          '12–30 practitioners working against real briefs',
          'Live sessions, office hours, and reviewed project work',
          'Curriculum built on your tools, constraints, and culture',
          'Internal champions trained to run the next cohort',
        ]}
        outcome="A fluent team, documented standards, and someone inside who can teach it."
      />
      <ProgramCard
        index={1}
        total={4}
        duration="1–3 weeks"
        name="Audit"
        description="Trace the pipeline as it exists and find the seams where AI creates leverage without breaking trust."
        points={['Workflow map', 'Capability baseline', 'Written assessment and roadmap']}
        outcome="A clear picture of where the leverage is."
      />
    </div>
  ),
};

export const Offers: Story = {
  render: () => (
    <div style={{ maxWidth: '40rem' }}>
      <OfferCard
        index="01"
        title="Diagnostic & Keynote"
        subtitle="The best front door"
        description="A talk that shifts the room, or a focused assessment that tells leadership where they actually stand."
        includes={[
          'Keynote or all-hands',
          'Full-day team intensive',
          'Or a 2–3 week capability audit',
          'Written assessment and roadmap',
        ]}
        cta={{ label: "Let's engage and discuss details", href: '#' }}
      />
      <OfferCard
        index="02"
        title="Capability Program"
        subtitle="Core offering"
        description="Diagnose, design the curriculum, run the cohort on live work, and transfer the program to internal champions."
        includes={[
          '8–16 weeks, cohort of 12–30',
          'Documented standards and templates',
          'Executive readouts at midpoint and close',
          'Milestone billing, 40% to start',
        ]}
        cta={{ label: "Let's engage and discuss details", href: '#' }}
      />
    </div>
  ),
};
