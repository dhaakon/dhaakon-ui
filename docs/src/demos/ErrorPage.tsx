import { ErrorPage } from '@dhaakon/ui/app';
import { Button, FeaturedIcon } from '@dhaakon/ui';

export default function Demo() {
  return (
    <div style={{ border: '1px solid var(--dhk-border)' }}>
      <ErrorPage
        icon={<FeaturedIcon size="lg" tone="danger">!</FeaturedIcon>}
        code="Error 502"
        title="Could not reach the Brain API."
        description="http://brain:21700 did not respond within 3s. The container may still be starting."
        actions={<><Button variant="outline">Go back</Button><Button>Retry</Button></>}
        detail={'req-9f2c41a8 · upstream connect error\n  at BrainClient.fetch (api/brain.ts:88)'}
      />
    </div>
  );
}
