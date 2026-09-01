import { SearchField } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ maxWidth: 320 }}>
      <SearchField
        label="Find a container"
        placeholder="Search 43 containers"
        defaultValue="postgres"
        description="Escape clears the field."
      />
    </div>
  );
}
