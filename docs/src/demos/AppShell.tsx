import { AppShell, HeaderNav, PageHeader, SidebarNav } from '@dhaakon/ui/app';
import { Badge, Button } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ border: '1px solid var(--dhk-border)', height: 420, overflow: 'auto' }}>
      <AppShell
        header={<HeaderNav brand="Dhaakon" links={[{ label: 'Console', href: '#', current: true }, { label: 'Teams', href: '#' }]} />}
        sidebar={
          <SidebarNav
            groups={[
              { label: 'Compute', items: [{ label: 'Instance', href: '#', current: true }, { label: 'Load', href: '#' }] },
              { label: 'Workloads', items: [{ label: 'Containers', href: '#', count: '43' }] },
            ]}
          />
        }
      >
        <PageHeader
          title="homelab-nuc-1"
          badge={<Badge tone="success" dot>running</Badge>}
          actions={<Button>Redeploy</Button>}
        />
        <p style={{ color: 'var(--dhk-text-muted)' }}>Page content goes here.</p>
      </AppShell>
    </div>
  );
}
