import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../Field/Field';
import { Textarea } from './Textarea';

const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: { placeholder: 'Describe the change…', rows: 4 },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const InAField: Story = {
  render: (args) => (
    <div style={{ maxWidth: 480 }}>
      <Field label="Prompt" hint="Sent verbatim to the design agent.">
        <Textarea {...args} />
      </Field>
    </div>
  ),
};

export const Mono: Story = {
  args: { mono: true, defaultValue: '{\n  "region": "homelab-nuc-1",\n  "replicas": 3\n}' },
};
