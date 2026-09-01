import type { Meta, StoryObj } from '@storybook/react-vite';
import { Menu, MenuItem, MenuGroup, MenuSeparator } from './Menu';
import { Button } from '../Button/Button';
import { MoreIcon, SearchIcon, XIcon } from '../../lib/icons';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu as never,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj;

export const Basic: Story = {
  render: () => (
    <Menu trigger={<Button variant="outline">Actions</Button>}>
      <MenuItem>Restart</MenuItem>
      <MenuItem>View logs</MenuItem>
      <MenuItem>Open shell</MenuItem>
      <MenuSeparator />
      <MenuItem danger>Remove container</MenuItem>
    </Menu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Menu trigger={<Button variant="ghost" aria-label="More"><MoreIcon /></Button>} placement="bottom end">
      <MenuItem icon={<SearchIcon />}>Inspect</MenuItem>
      <MenuItem icon={<XIcon />} danger>Stop</MenuItem>
    </Menu>
  ),
};

export const Grouped: Story = {
  render: () => (
    <Menu trigger={<Button variant="outline">Deploy</Button>}>
      <MenuGroup label="Environment">
        <MenuItem>Local (NUC)</MenuItem>
        <MenuItem>Staging</MenuItem>
      </MenuGroup>
      <MenuSeparator />
      <MenuGroup label="Danger">
        <MenuItem danger>Production</MenuItem>
      </MenuGroup>
    </Menu>
  ),
};

export const DisabledItems: Story = {
  render: () => (
    <Menu trigger={<Button variant="outline">Actions</Button>} disabledKeys={['shell']}>
      <MenuItem id="restart">Restart</MenuItem>
      <MenuItem id="shell">Open shell (container stopped)</MenuItem>
    </Menu>
  ),
};
