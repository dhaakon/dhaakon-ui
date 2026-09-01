import type { Meta, StoryObj } from '@storybook/react-vite';
import { GridList, GridListAction, GridListItem } from './GridList';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof GridList> = {
  title: 'Components/GridList',
  component: GridList as never,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const services = [
  { id: 'brain', name: 'brain', status: 'running' },
  { id: 'gitserver', name: 'gitserver', status: 'running' },
  { id: 'zulip', name: 'zulip', status: 'running' },
  { id: 'openproject', name: 'openproject', status: 'stopped' },
];

export const Selectable: Story = {
  render: () => (
    <div style={{ maxWidth: 460 }}>
      <GridList aria-label="Services" selectionMode="multiple" defaultSelectedKeys={['brain']}>
        {services.map((s) => (
          <GridListItem key={s.id} id={s.id} textValue={s.name}>
            <span>{s.name}</span>
            <Badge tone={s.status === 'running' ? 'success' : 'danger'} dot>{s.status}</Badge>
          </GridListItem>
        ))}
      </GridList>
    </div>
  ),
};

export const WithActions: Story = {
  render: () => (
    <div style={{ maxWidth: 460 }}>
      <GridList aria-label="Services" selectionMode="single">
        {services.map((s) => (
          <GridListItem key={s.id} id={s.id} textValue={s.name}>
            <span>{s.name}</span>
            <GridListAction aria-label={`Restart ${s.name}`}>Restart</GridListAction>
          </GridListItem>
        ))}
      </GridList>
    </div>
  ),
};

export const Empty: Story = {
  render: () => (
    <div style={{ maxWidth: 460 }}>
      <GridList aria-label="Services" emptyText="No services match this filter.">
        {[]}
      </GridList>
    </div>
  ),
};
