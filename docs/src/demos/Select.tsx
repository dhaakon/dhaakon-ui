import { Select, SelectItem } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ maxWidth: 320 }}>
      <Select label="Region" placeholder="Choose a region" defaultSelectedKey="nuc">
        <SelectItem id="nuc">homelab-nuc-1</SelectItem>
        <SelectItem id="hel">hel1-dc2</SelectItem>
        <SelectItem id="use1">us-east-1</SelectItem>
      </Select>
    </div>
  );
}
