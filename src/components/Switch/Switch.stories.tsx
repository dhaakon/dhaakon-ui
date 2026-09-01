import type { Meta, StoryObj } from '@storybook/react-vite';
import { Switch } from './Switch';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { children: 'Auto-restart containers' },
};
export default meta;
type Story = StoryObj<typeof Switch>;

export const Playground: Story = {};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-start' }}>
      <Switch>Off</Switch>
      <Switch defaultSelected>On</Switch>
      <Switch isDisabled>Disabled</Switch>
      <Switch isDisabled defaultSelected>Disabled + on</Switch>
    </div>
  ),
};

export const LabelFirst: Story = {
  render: () => (
    <div style={{ width: 260, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <Switch labelPosition="start" defaultSelected>Log rotation</Switch>
      <Switch labelPosition="start">Anonymous metrics</Switch>
    </div>
  ),
};
