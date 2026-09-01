import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion, AccordionItem } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Basic: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Accordion defaultExpandedKeys={['a']}>
        <AccordionItem id="a" title="What does the capability program include?">
          Diagnose the system, design the curriculum against live briefs, run the cohort, and transfer
          the practice to internal champions. Eight to sixteen weeks.
        </AccordionItem>
        <AccordionItem id="b" title="How large is a cohort?">
          Twelve to thirty practitioners, working against real briefs from your pipeline.
        </AccordionItem>
        <AccordionItem id="c" title="What happens at the end?">
          The engagement closes when the knowledge has moved out of my head and into your organization.
        </AccordionItem>
      </Accordion>
    </div>
  ),
};

export const MultipleOpen: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Accordion allowsMultipleExpanded defaultExpandedKeys={['a', 'b']}>
        <AccordionItem id="a" title="Compute">8 vCPU · Intel i7-8809G · 3.10 GHz</AccordionItem>
        <AccordionItem id="b" title="Memory">30 GiB total · 21 GiB used · 8 GiB swap</AccordionItem>
        <AccordionItem id="c" title="Storage">Samsung 970 EVO Plus 500 GB · 19% used</AccordionItem>
      </Accordion>
    </div>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <div style={{ maxWidth: 640 }}>
      <Accordion>
        <AccordionItem id="open" title="Available section">Expandable.</AccordionItem>
        <AccordionItem id="locked" title="Locked section" isDisabled>Never reachable.</AccordionItem>
      </Accordion>
    </div>
  ),
};
