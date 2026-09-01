import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toolbar, ToolbarSeparator } from './Toolbar';
import { Button } from '../Button/Button';
import { ButtonGroup } from '../ButtonGroup/ButtonGroup';

const meta: Meta<typeof Toolbar> = {
  title: 'Components/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Toolbar>;

export const Basic: Story = {
  render: () => (
    <Toolbar aria-label="Container actions">
      <ButtonGroup>
        <Button variant="outline" size="sm">Start</Button>
        <Button variant="outline" size="sm">Stop</Button>
        <Button variant="outline" size="sm">Restart</Button>
      </ButtonGroup>
      <ToolbarSeparator />
      <Button variant="ghost" size="sm">Logs</Button>
      <Button variant="ghost" size="sm">Shell</Button>
      <ToolbarSeparator />
      <Button variant="ghost" size="sm">Inspect</Button>
    </Toolbar>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Toolbar aria-label="Container actions" orientation="vertical">
      <Button variant="ghost" size="sm">Start</Button>
      <Button variant="ghost" size="sm">Stop</Button>
      <ToolbarSeparator orientation="horizontal" />
      <Button variant="ghost" size="sm">Remove</Button>
    </Toolbar>
  ),
};
