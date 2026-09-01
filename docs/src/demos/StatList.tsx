import { StatList } from '@dhaakon/ui/app';

export default function Demo() {
  return (
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
  );
}
