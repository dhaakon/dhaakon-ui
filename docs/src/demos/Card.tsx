import { Badge, Button, Card, CardBody, CardFooter, CardHeader } from '@dhaakon/ui';

export default function Demo() {
  return (
    <Card raised style={{ maxWidth: 420 }}>
      <CardHeader title="brain" subtitle="Orchestration API" action={<Badge tone="success" dot>Running</Badge>} />
      <CardBody>
        <p style={{ margin: 0, color: 'var(--dhk-text-muted)' }}>
          Tasks, teams, workflows and agent dispatch for the dhaakon-network.
        </p>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="outline">Logs</Button>
        <Button size="sm">Open</Button>
      </CardFooter>
    </Card>
  );
}
