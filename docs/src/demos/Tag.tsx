import { useState } from 'react';
import { Tag, TagGroup, TagList } from '@dhaakon/ui';

export default function Demo() {
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
}
