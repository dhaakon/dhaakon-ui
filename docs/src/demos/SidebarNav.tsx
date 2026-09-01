import { SidebarNav } from '@dhaakon/ui/app';

export default function Demo() {
  return (
    <div style={{ width: 250, border: '1px solid var(--dhk-border)' }}>
      <SidebarNav
        groups={[
          { label: 'Compute', items: [
            { label: 'Instance', href: '#', current: true },
            { label: 'Load & processes', href: '#' },
          ] },
          { label: 'Workloads', items: [
            { label: 'Container service', href: '#', count: '43' },
            { label: 'App runner', href: '#', count: '5' },
          ] },
          { label: 'Network', items: [
            { label: 'VPC', href: '#' },
            { label: 'Tailnet', href: '#', count: '10' },
          ] },
        ]}
      />
    </div>
  );
}
