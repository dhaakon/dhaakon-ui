import type { Meta, StoryObj } from '@storybook/react-vite';
import { ColorPicker, ColorSwatch } from './ColorPicker';

const meta: Meta<typeof ColorPicker> = {
  title: 'Components/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof ColorPicker>;

export const Basic: Story = {
  render: () => (
    <div style={{ height: 320 }}>
      <ColorPicker label="Accent" defaultValue="#ff5a1f" />
    </div>
  ),
};

export const Swatches: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      {['#f0eee8', '#101010', '#ff5a1f', '#2d62ff', '#8a5cff', '#d9ff43'].map((c) => (
        <ColorSwatch key={c} color={c} />
      ))}
    </div>
  ),
};

export const Open: Story = {
  render: () => (
    <div style={{ height: 400 }}>
      <ColorPicker label="Accent" defaultValue="#2d62ff" />
    </div>
  ),
};
