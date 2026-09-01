import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBar } from './StatusBar';
import { SectionIntro, SectionMarker } from './Section';
import { DisplayHeading } from './DisplayHeading';
import { LogoMarquee } from './LogoMarquee';
import { FieldNote } from './FieldNote';
import { CtaLink } from './CtaLink';
import { SiteFooter } from './SiteFooter';
import { CapabilityIndex } from './CapabilityIndex';
import { ProcessStep } from './ProcessStep';
import { Marker } from './Marker';

const meta: Meta = {
  title: 'Site/Elements',
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

export const StatusBar_: Story = {
  name: 'StatusBar',
  render: () => (
    <StatusBar status="Listening" items={['Brooklyn, NY', 'Remote / N. America', '00 / 06']} />
  ),
};

export const Markers: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', fontSize: '1.25rem' }}>
      <Marker glyph="arrow-ne" tone="accent" />
      <Marker glyph="arrow-se" tone="ink" />
      <Marker glyph="arrow-lr" />
      <Marker glyph="target" tone="accent" />
      <Marker glyph="hook" />
      <Marker glyph="plus" tone="accent" />
      <Marker glyph="not-equal" />
    </div>
  ),
};

export const SectionMarker_: Story = {
  name: 'SectionMarker',
  render: () => <SectionMarker index="01" label="The approach" />,
};

export const SectionIntro_: Story = {
  name: 'SectionIntro',
  render: () => (
    <SectionIntro
      index="01"
      eyebrow="The approach"
      title="The problem is rarely the tool."
      subtitle="Why creative AI programs stall."
      lead="Every organization already has the licenses. What they don't have is a process that survives contact with a deadline."
    />
  ),
};

export const DisplayHeading_: Story = {
  name: 'DisplayHeading',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ padding: '4rem 2rem 8rem' }}>
      <DisplayHeading
        annotations={[
          { text: 'AI', glyph: 'arrow-ne', x: 8, y: -14 },
          { text: 'craft', glyph: 'arrow-se', x: 44, y: 108 },
          { text: 'team', glyph: 'target', x: 70, y: -10 },
          { text: 'own', x: 90, y: 96 },
        ]}
      >
        Make AI a craft<br />your team owns.
      </DisplayHeading>
    </div>
  ),
};

export const Marquee: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ padding: '3rem 0' }}>
      <LogoMarquee
        logos={['Ford', 'Meta', 'Google', 'Samsung', 'Coca-Cola', "McDonald's", 'NYU Tisch', 'Hornet', 'BCG Digital Ventures', 'Barnard College']}
      />
    </div>
  ),
};

export const FieldNote_: Story = {
  name: 'FieldNote',
  render: () => (
    <FieldNote label="Field note 02.1">
      Experience is part of the method. A tool rollout only changes the work when
      practitioners trust the person teaching it.
    </FieldNote>
  ),
};

export const Process: Story = {
  render: () => (
    <div>
      <ProcessStep index="01" title="Listen" summary="Sit with the people doing the work and trace the pipeline as it exists." output="Workflow map + capability baseline" />
      <ProcessStep index="02" title="Build" summary="Design the program against current briefs, actual deadlines, your approved stack." output="Custom curriculum + working patterns" />
      <ProcessStep index="03" title="Practice" summary="Cohorts work in the open. Each round turns individual tricks into repeatable craft." output="Reviewed work + documented standards" />
      <ProcessStep index="04" title="Transfer" summary="Internal champions run the pattern themselves. The engagement closes." output="Champion handoff + next-cohort plan" />
    </div>
  ),
};

export const Capabilities: Story = {
  render: () => (
    <CapabilityIndex
      heading="08 capabilities"
      items={[
        'Creative AI workflows',
        'Agentic prototyping',
        'Design-to-code',
        'Generative image + video',
        'Virtual production',
        'Curriculum + cohorts',
        'Responsible adoption',
        'Creative systems',
      ]}
    />
  ),
};

export const Cta: Story = {
  render: () => <CtaLink href="#">Let&rsquo;s engage and discuss details</CtaLink>,
};

export const Footer: Story = {
  render: () => <SiteFooter email="david@dhaakon.com" copyright="© 2026 David Poyner" items={['Approach', 'Programs', 'Proof']} />,
};
