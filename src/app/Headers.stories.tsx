import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageHeader, SectionHeader } from './PageHeader';
import { Badge } from '../components/Badge/Badge';
import { Button } from '../components/Button/Button';
import { Breadcrumb, Breadcrumbs } from '../components/Breadcrumbs/Breadcrumbs';
import { Tab, TabList, TabPanel, Tabs } from '../components/Tabs/Tabs';

const meta: Meta = {
  title: 'Composites/Headers',
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

export const Page: Story = {
  render: () => (
    <PageHeader
      breadcrumbs={
        <Breadcrumbs>
          <Breadcrumb href="#">Console</Breadcrumb>
          <Breadcrumb href="#">Container Service</Breadcrumb>
          <Breadcrumb>dhaakon-network</Breadcrumb>
        </Breadcrumbs>
      }
      title="dhaakon-network"
      badge={<Badge tone="success" dot>43 running</Badge>}
      description="The main Compose project: brain, gitea, zulip, observability and the design system."
      actions={<><Button variant="outline">Pull</Button><Button>Restart all</Button></>}
    />
  ),
};

export const WithTabs: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <PageHeader
        title="brain"
        badge={<Badge tone="success" dot>running</Badge>}
        flush
        actions={<Button variant="outline">Logs</Button>}
        tabs={
          <TabList label="Service sections">
            <Tab value="overview">Overview</Tab>
            <Tab value="env">Environment</Tab>
            <Tab value="volumes">Volumes</Tab>
          </TabList>
        }
      />
      <TabPanel value="overview">Orchestration API on :21700.</TabPanel>
      <TabPanel value="env">18 environment variables.</TabPanel>
      <TabPanel value="volumes">2 mounts.</TabPanel>
    </Tabs>
  ),
};

export const Section: Story = {
  render: () => (
    <>
      <SectionHeader
        title="Volumes"
        description="Block devices and mounted filesystems."
        actions={<Button size="sm" variant="outline">Add volume</Button>}
      />
      <p style={{ color: 'var(--dhk-text-muted)' }}>Section content.</p>
    </>
  ),
};
