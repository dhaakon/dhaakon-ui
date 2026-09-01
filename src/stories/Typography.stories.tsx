import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Foundations/Typography',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '10rem 1fr', gap: '1rem', alignItems: 'baseline', padding: '0.75rem 0', borderBottom: '1px solid var(--dhk-border)' }}>
    <div className="dhk-mono" style={{ color: 'var(--dhk-text-subtle)', fontSize: '0.7rem' }}>{label}</div>
    <div>{children}</div>
  </div>
);

export const Families: Story = {
  render: () => (
    <div>
      <Row label="IBM Plex Sans"><span style={{ fontFamily: 'var(--dhk-font-sans)' }}>Make AI a craft your team owns — 0123456789</span></Row>
      <Row label="IBM Plex Serif"><span style={{ fontFamily: 'var(--dhk-font-serif)' }}>Make AI a craft your team owns — <em>0123456789</em></span></Row>
      <Row label="IBM Plex Mono"><span style={{ fontFamily: 'var(--dhk-font-mono)' }}>i-60b786b1ac524aa6b · 100.98.68.76</span></Row>
      <Row label="Plex Sans Condensed"><span style={{ fontFamily: 'var(--dhk-font-condensed)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Container Service · App Runner</span></Row>
    </div>
  ),
};

export const Scale: Story = {
  render: () => (
    <div>
      <Row label="display"><span className="dhk-display" style={{ fontSize: '3.5rem' }}>Aa</span></Row>
      <Row label="title"><span className="dhk-title">The dhaakon-network at a glance</span></Row>
      <Row label="2xl / 2rem"><span style={{ fontSize: 'var(--dhk-text-2xl)' }}>Section heading</span></Row>
      <Row label="lg / 1.15rem"><span style={{ fontSize: 'var(--dhk-text-lg)' }}>Card title</span></Row>
      <Row label="base / 1rem"><span>Body copy sits at one rem, weight 300.</span></Row>
      <Row label="sm / 0.875rem"><span style={{ fontSize: 'var(--dhk-text-sm)' }}>Secondary and table text</span></Row>
      <Row label="xs / 0.75rem"><span style={{ fontSize: 'var(--dhk-text-xs)' }}>Hints and metadata</span></Row>
      <Row label="eyebrow / 2xs"><span className="dhk-eyebrow">Uppercase label</span></Row>
    </div>
  ),
};
