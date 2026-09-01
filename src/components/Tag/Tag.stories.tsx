import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag, TagGroup, TagList } from './Tag';

const meta: Meta<typeof TagGroup> = {
  title: 'Components/Tag',
  component: TagGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof TagGroup>;

export const Basic: Story = {
  render: () => (
    <TagGroup label="Labels">
      <TagList>
        <Tag id="core">core</Tag>
        <Tag id="ai">ai</Tag>
        <Tag id="infra">infra</Tag>
      </TagList>
    </TagGroup>
  ),
};

export const Removable: Story = {
  render: function Removable() {
    const [items, setItems] = useState([
      { id: 'brain', name: 'brain' },
      { id: 'gitea', name: 'gitea' },
      { id: 'zulip', name: 'zulip' },
      { id: 'grafana', name: 'grafana' },
    ]);
    return (
      <TagGroup
        label="Filtered services"
        description="Backspace or the × removes a tag."
        onRemove={(keys) => setItems((prev) => prev.filter((i) => !keys.has(i.id)))}
      >
        <TagList items={items}>{(i: { id: string; name: string }) => <Tag>{i.name}</Tag>}</TagList>
      </TagGroup>
    );
  },
};

export const Selectable: Story = {
  render: () => (
    <TagGroup label="Categories" selectionMode="multiple" defaultSelectedKeys={['ai']}>
      <TagList>
        <Tag id="core">core</Tag>
        <Tag id="ai">ai</Tag>
        <Tag id="apps">apps</Tag>
        <Tag id="obs">observability</Tag>
      </TagList>
    </TagGroup>
  ),
};
