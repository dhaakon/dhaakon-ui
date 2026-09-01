import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './Radio';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Basic: Story = {
  render: () => (
    <RadioGroup label="Restart policy" defaultValue="unless-stopped">
      <Radio value="no">no</Radio>
      <Radio value="on-failure">on-failure</Radio>
      <Radio value="unless-stopped">unless-stopped</Radio>
      <Radio value="always" isDisabled>always</Radio>
    </RadioGroup>
  ),
};

export const WithDescriptions: Story = {
  render: () => (
    <RadioGroup label="Deployment target" defaultValue="local">
      <Radio value="local" description="Runs on the NUC. ~$8/month in electricity.">Local</Radio>
      <Radio value="hetzner" description="8 vCPU / 16 GB dedicated. ~$35/month.">Hetzner</Radio>
      <Radio value="aws" description="m5.xlarge + 500 GB gp3. ~$180/month.">AWS</Radio>
    </RadioGroup>
  ),
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup label="Theme" orientation="horizontal" defaultValue="system">
      <Radio value="light">Light</Radio>
      <Radio value="dark">Dark</Radio>
      <Radio value="system">System</Radio>
    </RadioGroup>
  ),
};

export const Invalid: Story = {
  render: () => (
    <RadioGroup label="Restart policy" isInvalid errorMessage="Choose a policy before deploying.">
      <Radio value="no">no</Radio>
      <Radio value="always">always</Radio>
    </RadioGroup>
  ),
};
