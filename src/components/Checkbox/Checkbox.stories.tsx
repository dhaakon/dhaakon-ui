import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox, CheckboxGroup } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { children: 'Restart on failure' },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Playground: Story = {};

export const WithDescription: Story = {
  args: { children: 'Pin image digests', description: 'Reproducible builds; blocks silent upgrades.' },
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Checkbox>Unselected</Checkbox>
      <Checkbox defaultSelected>Selected</Checkbox>
      <Checkbox isIndeterminate>Indeterminate</Checkbox>
      <Checkbox isDisabled>Disabled</Checkbox>
      <Checkbox isDisabled defaultSelected>Disabled + selected</Checkbox>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <CheckboxGroup label="Stack services" defaultValue={['brain']} description="Started with the stack.">
      <Checkbox value="brain">Brain API</Checkbox>
      <Checkbox value="gitea">Gitea</Checkbox>
      <Checkbox value="zulip" description="4.3 GiB resident">Zulip</Checkbox>
    </CheckboxGroup>
  ),
};

export const GroupInvalid: Story = {
  render: () => (
    <CheckboxGroup label="Stack services" isInvalid errorMessage="Pick at least one service.">
      <Checkbox value="brain">Brain API</Checkbox>
      <Checkbox value="gitea">Gitea</Checkbox>
    </CheckboxGroup>
  ),
};
