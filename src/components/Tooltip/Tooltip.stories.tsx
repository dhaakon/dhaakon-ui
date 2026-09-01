import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip } from './Tooltip';
import { Button } from '../Button/Button';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  render: () => (
    <Tooltip content="Rebuilds the image and recreates the container.">
      <Button variant="outline">Redeploy</Button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: '2rem', placeItems: 'center' }}>
      {(['top', 'bottom', 'left', 'right'] as const).map((p) => (
        <Tooltip key={p} placement={p} content={`Placed ${p}`} delay={0}>
          <Button variant="ghost">{p}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const Instant: Story = {
  render: () => (
    <Tooltip delay={0} content="No warmup delay — opens immediately on hover.">
      <Button variant="outline">Hover me</Button>
    </Tooltip>
  ),
};

export const NoArrow: Story = {
  render: () => (
    <Tooltip arrow={false} delay={0} content="Arrowless.">
      <Button variant="outline">Plain</Button>
    </Tooltip>
  ),
};
