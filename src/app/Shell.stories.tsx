import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';
import { HeaderNav } from './HeaderNav';
import { SidebarNav } from './SidebarNav';
import { PageHeader } from './PageHeader';
import { Avatar } from '../components/Avatar/Avatar';
import { Badge } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';
import { Menu, MenuItem } from '../components/Menu/Menu';

const meta: Meta = {
  title: 'Composites/Shell',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

const GROUPS = [
  {
    label: 'Compute',
    items: [
      { label: 'Instance', href: '#', current: true },
      { label: 'Load & processes', href: '#' },
    ],
  },
  {
    label: 'Workloads',
    items: [
      { label: 'Container service', href: '#', count: '43' },
      { label: 'App runner', href: '#', count: '5' },
    ],
  },
  { label: 'Network', items: [{ label: 'VPC', href: '#' }, { label: 'Tailnet', href: '#', count: '10' }] },
];

const header = (
  <HeaderNav
    brand="Dhaakon"
    mark="◆"
    links={[
      { label: 'Console', href: '#', current: true },
      { label: 'Teams', href: '#' },
      { label: 'Docs', href: '#' },
    ]}
    end={
      <Menu trigger={<Button variant="ghost" aria-label="Account"><Avatar name="David Poyner" size="xs" /></Button>} placement="bottom end">
        <MenuItem>Settings</MenuItem>
        <MenuItem>Sign out</MenuItem>
      </Menu>
    }
  />
);

export const Full: Story = {
  render: () => (
    <AppShell header={header} sidebar={<SidebarNav groups={GROUPS} />}>
      <PageHeader
        title="homelab-nuc-1"
        badge={<Badge tone="success" dot>running</Badge>}
        description="Intel NUC8i7HVK · 8 vCPU · 30 GiB · nuc8i7hvk.metal"
        actions={<><Button variant="outline">Logs</Button><Button>Redeploy</Button></>}
      />
      <p style={{ color: 'var(--dhk-text-muted)' }}>Page content goes here.</p>
    </AppShell>
  ),
};

export const NoSidebar: Story = {
  render: () => (
    <AppShell header={header}>
      <PageHeader title="Settings" description="Applies to every project in this account." />
      <p style={{ color: 'var(--dhk-text-muted)' }}>Full-width content.</p>
    </AppShell>
  ),
};

export const SidebarOnly: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => <div style={{ width: 240 }}><SidebarNav groups={GROUPS} /></div>,
};
