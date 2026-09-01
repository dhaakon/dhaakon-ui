import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComboBox } from './ComboBox';
import { SelectItem } from '../Select/Select';

const meta: Meta<typeof ComboBox> = {
  title: 'Components/ComboBox',
  component: ComboBox as never,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj;

const services = [
  'brain', 'gitserver', 'zulip', 'openproject', 'taiga-back', 'penpot-backend',
  'grafana', 'prometheus', 'loki', 'qdrant', 'verdaccio', 'dhaakon-ui',
];

export const Basic: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <ComboBox label="Service" placeholder="Start typing…">
        {services.map((s) => <SelectItem key={s} id={s}>{s}</SelectItem>)}
      </ComboBox>
    </div>
  ),
};

export const AsSearch: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <ComboBox label="Find a container" searchIcon placeholder="Search 43 containers" emptyText="No container matches.">
        {services.map((s) => <SelectItem key={s} id={s}>{s}</SelectItem>)}
      </ComboBox>
    </div>
  ),
};

export const AllowsCustomValue: Story = {
  render: () => (
    <div style={{ maxWidth: 320 }}>
      <ComboBox label="Image tag" allowsCustomValue placeholder="latest" description="Type a tag or pick a known one.">
        {['latest', 'v1.22.6', 'v1.21.0', 'alpine'].map((s) => <SelectItem key={s} id={s}>{s}</SelectItem>)}
      </ComboBox>
    </div>
  ),
};
