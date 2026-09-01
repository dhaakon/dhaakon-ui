import { PageHeader, SectionHeader } from '@dhaakon/ui/app';
import { Badge, Breadcrumb, Breadcrumbs, Button } from '@dhaakon/ui';

export default function Demo() {
  return (
    <>
      <PageHeader
        breadcrumbs={
          <Breadcrumbs>
            <Breadcrumb href="#">Console</Breadcrumb>
            <Breadcrumb href="#">Container Service</Breadcrumb>
            <Breadcrumb>dhaakon-network</Breadcrumb>
          </Breadcrumbs>
        }
        title="dhaakon-network"
        badge={<Badge tone="success" dot>43 running</Badge>}
        description="The main Compose project: brain, gitea, zulip, observability and the design system."
        actions={<><Button variant="outline">Pull</Button><Button>Restart all</Button></>}
      />
      <SectionHeader
        title="Volumes"
        description="Block devices and mounted filesystems."
        actions={<Button size="sm" variant="outline">Add volume</Button>}
      />
    </>
  );
}
