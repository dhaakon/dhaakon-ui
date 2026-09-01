import { ComboBox, SelectItem } from '@dhaakon/ui';

const services = ['brain', 'gitserver', 'zulip', 'openproject', 'grafana', 'prometheus', 'qdrant', 'verdaccio'];

export default function Demo() {
  return (
    <div style={{ maxWidth: 320 }}>
      <ComboBox label="Find a container" searchIcon placeholder="Search 43 containers" emptyText="No container matches.">
        {services.map((s) => <SelectItem key={s} id={s}>{s}</SelectItem>)}
      </ComboBox>
    </div>
  );
}
