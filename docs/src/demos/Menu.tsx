import { Button, Menu, MenuItem, MenuGroup, MenuSeparator } from '@dhaakon/ui';

export default function Demo() {
  return (
    <Menu trigger={<Button variant="outline">Actions</Button>}>
      <MenuGroup label="Container">
        <MenuItem>Restart</MenuItem>
        <MenuItem>View logs</MenuItem>
        <MenuItem>Open shell</MenuItem>
      </MenuGroup>
      <MenuSeparator />
      <MenuItem danger>Remove container</MenuItem>
    </Menu>
  );
}
