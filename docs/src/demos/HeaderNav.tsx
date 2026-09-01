import { HeaderNav } from '@dhaakon/ui/app';
import { Avatar, Button, Menu, MenuItem } from '@dhaakon/ui';

export default function Demo() {
  return (
    <HeaderNav
      brand="Dhaakon"
      mark="◆"
      links={[
        { label: 'Console', href: '#', current: true },
        { label: 'Teams', href: '#' },
        { label: 'Docs', href: '#' },
      ]}
      end={
        <Menu
          trigger={<Button variant="ghost" aria-label="Account"><Avatar name="David Poyner" size="xs" /></Button>}
          placement="bottom end"
        >
          <MenuItem>Settings</MenuItem>
          <MenuItem>Sign out</MenuItem>
        </Menu>
      }
    />
  );
}
