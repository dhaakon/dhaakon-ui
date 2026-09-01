import { ProgressSteps } from '@dhaakon/ui/app';

export default function Demo() {
  return (
    <div style={{ display: 'grid', gap: '2.5rem' }}>
      <ProgressSteps
        current={1}
        steps={[
          { title: 'Listen', description: 'Trace the pipeline as it exists.' },
          { title: 'Build', description: 'Design against live briefs.' },
          { title: 'Practice', description: 'Cohorts work in the open.' },
          { title: 'Transfer', description: 'Champions run the pattern.' },
        ]}
      />
      <div style={{ maxWidth: 320 }}>
        <ProgressSteps
          orientation="vertical"
          current={2}
          steps={[
            { title: 'Pull image' },
            { title: 'Run migrations' },
            { title: 'Start containers', description: 'Waiting on health checks…' },
            { title: 'Swap traffic' },
          ]}
        />
      </div>
    </div>
  );
}
