import type { Meta, StoryObj } from '@storybook/react-vite';
import { MetricRow, MetricTile, Sparkline } from './Metrics';
import { StatList } from './StatList';

const meta: Meta = {
  title: 'Composites/Metrics',
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj;

const cpu = [12, 18, 14, 22, 19, 31, 26, 18, 21, 17, 24, 18];
const err = [0, 1, 0, 0, 2, 1, 4, 6, 5, 9, 12, 14];

export const Row: Story = {
  render: () => (
    <MetricRow>
      <MetricTile label="CPU" value="18" unit="%" delta="-6%" caption="vs. 1h ago"
        chart={<Sparkline values={cpu} />} />
      <MetricTile label="Memory" value="21.4" unit="GiB" delta="+2%" caption="of 30 GiB"
        chart={<Sparkline values={[18, 19, 20, 20, 21, 21, 21.4]} tone="accent" />} />
      <MetricTile label="Containers" value="43" delta="+0" caption="all projects" />
      <MetricTile label="Error rate" value="1.4" unit="%" delta="+0.9%" invertDelta
        caption="last 15 min" chart={<Sparkline values={err} tone="danger" />} />
    </MetricRow>
  ),
};

export const SingleTile: Story = {
  render: () => (
    <div style={{ maxWidth: 260, border: '1px solid var(--dhk-border)' }}>
      <MetricTile label="Disk" value="86" unit="GiB" delta="+1.2 GiB" caption="of 465 GiB" />
    </div>
  ),
};

export const Sparklines: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: '1rem', maxWidth: 320 }}>
      <Sparkline values={cpu} aria-label="CPU over the last hour" />
      <Sparkline values={err} tone="danger" />
      <Sparkline values={[5, 5, 5, 5, 5]} tone="success" />
    </div>
  ),
};

export const Stats: Story = {
  render: () => (
    <div style={{ maxWidth: 620 }}>
      <StatList
        boxed
        stats={[
          { label: 'Instance ID', value: <span className="dhk-mono">i-60b786b1ac524aa6b</span> },
          { label: 'Instance type', value: <span className="dhk-mono">nuc8i7hvk.metal</span> },
          { label: 'Region / AZ', value: <span className="dhk-mono">homelab-nuc-1 / homelab-nuc-1a</span> },
          { label: 'Hardware', value: 'Intel(R) Client Systems NUC8i7HVK' },
          { label: 'Firmware', value: 'HNKBLi70.86A.0058.2019.0705.1646 (07/05/2019)' },
        ]}
      />
    </div>
  ),
};
