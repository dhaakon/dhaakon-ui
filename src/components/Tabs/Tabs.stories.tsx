import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Basic: Story = {
  render: () => (
    <div style={{ width: 'min(560px, 90vw)' }}>
    <Tabs defaultValue="instance">
      <TabList label="Console sections">
        <Tab value="instance">Instance</Tab>
        <Tab value="volumes">Volumes</Tab>
        <Tab value="network">Network</Tab>
        <Tab value="billing" disabled>Billing</Tab>
      </TabList>
      <TabPanel value="instance">
        <p style={{ color: 'var(--dhk-text-muted)' }}>8 vCPU · 30 GiB · nuc8i7hvk.metal</p>
      </TabPanel>
      <TabPanel value="volumes">
        <p style={{ color: 'var(--dhk-text-muted)' }}>nvme0n1 — 465.8 GiB SSD</p>
      </TabPanel>
      <TabPanel value="network">
        <p style={{ color: 'var(--dhk-text-muted)' }}>tailscale0 · 100.98.68.76</p>
      </TabPanel>
    </Tabs>
    </div>
  ),
};
