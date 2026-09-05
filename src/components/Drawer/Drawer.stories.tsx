import type { Meta, StoryObj } from '@storybook/react-vite';
import { Drawer } from './Drawer';
import { Button } from '../Button/Button';
import { CodeSnippet } from '../../app/CodeSnippet';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  tags: ['autodocs'],
  args: {
    title: 'Experiment / 0042',
    description: 'Local fixture. No infrastructure connection.',
    trigger: <Button variant="outline">Inspect experiment</Button>,
    children: <CodeSnippet title="manifest.json" language="json" code={'{\n  "seed": 42,\n  "frames": 576,\n  "frameRate": 24\n}'} />,
    footer: (close) => <Button onClick={close}>Done inspecting</Button>,
  },
};
export default meta;
type Story = StoryObj<typeof Drawer>;

export const Inspector: Story = {};
export const StartEdge: Story = { args: { placement: 'start' } };
export const LongContent: Story = {
  args: {
    children: <ol>{Array.from({ length: 40 }, (_, index) => <li key={index} style={{ paddingBlock: '.75rem' }}>Recorded sample {index + 1} · inspectable fixture data.</li>)}</ol>,
  },
};
