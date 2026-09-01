import { InlineCTA } from '@dhaakon/ui/app';
import { Button, FeaturedIcon } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <InlineCTA
        icon={<FeaturedIcon tone="accent">↑</FeaturedIcon>}
        title="@dhaakon/ui 0.4.0 is available"
        description="25 application composites, published to the network registry."
        actions={<Button size="sm" variant="outline">Release notes</Button>}
      />
      <InlineCTA
        variant="ink"
        title="Finish setting up this team"
        description="Two of five steps remain: connect a repository and invite a reviewer."
        actions={<Button size="sm" variant="accent">Continue setup</Button>}
      />
    </div>
  );
}
