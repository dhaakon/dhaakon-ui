import { MetricRow, MetricTile, Sparkline } from '@dhaakon/ui/app';

const cpu = [12, 18, 14, 22, 19, 31, 26, 18, 21, 17, 24, 18];
const err = [0, 1, 0, 0, 2, 1, 4, 6, 5, 9, 12, 14];

export default function Demo() {
  return (
    <MetricRow>
      <MetricTile label="CPU" value="18" unit="%" delta="-6%" caption="vs. 1h ago"
        chart={<Sparkline values={cpu} />} />
      <MetricTile label="Memory" value="21.4" unit="GiB" delta="+2%" caption="of 30 GiB"
        chart={<Sparkline values={[18, 19, 20, 20, 21, 21, 21.4]} tone="accent" />} />
      <MetricTile label="Containers" value="43" delta="+0" caption="all projects" />
      {/* invertDelta: a rising error rate is bad news, so the arrow goes red. */}
      <MetricTile label="Error rate" value="1.4" unit="%" delta="+0.9%" invertDelta
        caption="last 15 min" chart={<Sparkline values={err} tone="danger" />} />
    </MetricRow>
  );
}
