import type { Meta, StoryObj } from '@storybook/react-vite';
import { Select, SelectItem } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select as never,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const regions = [
  { id: 'nuc', name: 'homelab-nuc-1' },
  { id: 'hetzner', name: 'hel1-dc2' },
  { id: 'aws', name: 'us-east-1' },
];

export const Basic: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select label="Region" placeholder="Choose a region" defaultSelectedKey="nuc">
        {regions.map((r) => (
          <SelectItem key={r.id} id={r.id}>{r.name}</SelectItem>
        ))}
      </Select>
    </div>
  ),
};

export const DataDriven: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select label="Region" items={regions} placeholder="Choose a region">
        {(r: { id: string; name: string }) => <SelectItem id={r.id}>{r.name}</SelectItem>}
      </Select>
    </div>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select label="Restart policy" description="Applied on the next deploy." defaultSelectedKey="unless">
        <SelectItem id="no">no</SelectItem>
        <SelectItem id="onfail">on-failure</SelectItem>
        <SelectItem id="unless">unless-stopped</SelectItem>
      </Select>
    </div>
  ),
};

export const Invalid: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select label="Region" placeholder="Choose a region" isInvalid errorMessage="Region is required.">
        <SelectItem id="nuc">homelab-nuc-1</SelectItem>
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <Select label="Region" isDisabled placeholder="Locked to homelab">
        <SelectItem id="nuc">homelab-nuc-1</SelectItem>
      </Select>
    </div>
  ),
};

/** Rendered open so the listbox, hover and selected states are visible at a glance. */
export const Open: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ maxWidth: 320, height: 260 }}>
      <Select label="Region" defaultOpen defaultSelectedKey="hetzner">
        {regions.map((r) => (
          <SelectItem key={r.id} id={r.id}>{r.name}</SelectItem>
        ))}
      </Select>
    </div>
  ),
};
