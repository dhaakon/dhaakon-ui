import type { Meta, StoryObj } from '@storybook/react-vite';
import { Field } from '../Field/Field';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  args: { placeholder: 'agent-7c034b0e', size: 'md' },
  argTypes: { size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] } },
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const InAField: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: '1.5rem', maxWidth: 380 }}>
      <Field label="Team name" hint="Lowercase, used as the Gitea org slug.">
        <Input {...args} placeholder="skunkworks" />
      </Field>
      <Field label="Service token" required>
        <Input {...args} mono placeholder="dccd-shared-service-token" />
      </Field>
      <Field label="Replicas" error="Must be between 1 and 8.">
        <Input {...args} type="number" defaultValue={12} />
      </Field>
    </div>
  ),
};

export const Mono: Story = { args: { mono: true, defaultValue: 'i-60b786b1ac524aa6b' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'locked' } };
