import { Button, EmptyState, FeaturedIcon } from '@dhaakon/ui';

export default function Demo() {
  return (
    <EmptyState
      icon={<FeaturedIcon size="lg" tone="accent" solid>◎</FeaturedIcon>}
      title="No teams yet"
      description="A team gets its own Gitea org, Zulip stream and project board."
      actions={
        <>
          <Button variant="outline">Import from Gitea</Button>
          <Button>Create a team</Button>
        </>
      }
    />
  );
}
