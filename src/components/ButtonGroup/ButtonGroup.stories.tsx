import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button/Button';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Basic: Story = {
  render: () => (
    <ButtonGroup label="Log range">
      <Button variant="outline">1h</Button>
      <Button variant="outline">24h</Button>
      <Button variant="outline">7d</Button>
    </ButtonGroup>
  ),
};

export const Vertical: Story = {
  render: () => (
    <ButtonGroup orientation="vertical" label="Container actions">
      <Button variant="outline">Restart</Button>
      <Button variant="outline">Logs</Button>
      <Button variant="outline">Shell</Button>
    </ButtonGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <ButtonGroup><Button size="sm" variant="outline">Prev</Button><Button size="sm" variant="outline">Next</Button></ButtonGroup>
      <ButtonGroup><Button variant="outline">Prev</Button><Button variant="outline">Next</Button></ButtonGroup>
      <ButtonGroup><Button size="lg" variant="outline">Prev</Button><Button size="lg" variant="outline">Next</Button></ButtonGroup>
    </div>
  ),
};
