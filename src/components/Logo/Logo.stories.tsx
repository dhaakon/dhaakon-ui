import type { Meta, StoryObj } from '@storybook/react-vite';
import { Logo, LogoMark } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
};
export default meta;
type Story = StoryObj<typeof Logo>;

export const Lockup: Story = { render: () => <Logo /> };

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Logo size={16} />
      <Logo size={22} />
      <Logo size={32} />
      <Logo size={48} />
    </div>
  ),
};

export const MarkOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
      <LogoMark size={20} />
      <LogoMark size={32} />
      <LogoMark size={48} />
      <LogoMark size={64} />
    </div>
  ),
};

/** `outline` drops the filled square and inherits `currentColor`. */
export const Outline: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Logo variant="outline" size={32} />
      <span style={{ color: 'var(--dhk-accent)' }}><Logo variant="outline" size={32} /></span>
      <span style={{ background: 'var(--dhk-ink)', color: 'var(--dhk-paper)', padding: '0.75rem' }}>
        <Logo variant="outline" size={32} />
      </span>
    </div>
  ),
};

export const NoDot: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
      <Logo size={32} hideDot />
      <Logo size={32} variant="outline" hideDot />
    </div>
  ),
};

export const AsLink: Story = { render: () => <Logo href="#" size={24} /> };
