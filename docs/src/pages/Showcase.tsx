import { useEffect, useState } from 'react';
import { MotionConfig, Reveal, motion, useTween } from '@dhaakon/motion/react';
import { stagger } from '@dhaakon/motion';
import {
  Avatar, Badge, Button, DataCell, DataColumn, DataRow, DataTable, DataTableBody,
  DataTableHeader, Drawer, FeaturedIcon, Switch,
} from '@dhaakon/ui';
import {
  ActivityFeed, DataGrid, FilterBar, MetricRow, MetricTile, PageHeader,
  ConfirmDialog, LogViewer, ProgressSteps, Sparkline, StatList, type LogEntry,
} from '@dhaakon/ui/app';
import { CodeBlock } from '../parts/CodeBlock';

const cpu = [12, 18, 14, 22, 19, 31, 26, 18, 21, 17, 24, 18];
const mem = [18, 19, 20, 20, 21, 21, 21.4];
const delayFor = stagger(70);

/** A metric whose number counts up rather than appearing at its final value. */
function CountingMetric({
  label, to, unit, decimals = 0, delay, chart, caption,
}: {
  label: string;
  to: number;
  unit?: string;
  decimals?: number;
  delay: number;
  chart?: React.ReactNode;
  caption?: string;
}) {
  // useTween rerenders each frame — right here, because the value *is* the
  // content. A style would go through motion.* instead.
  const { value } = useTween(0, to, { duration: 900, delay, easing: 'easeOutCubic' });
  return (
    <MetricTile label={label} value={value.toFixed(decimals)} unit={unit} caption={caption} chart={chart} />
  );
}

const ROWS = [
  { id: '1', name: 'brain', port: 21700, mem: 104, status: 'running' },
  { id: '2', name: 'gitserver', port: 21724, mem: 695, status: 'running' },
  { id: '3', name: 'zulip', port: 21726, mem: 4300, status: 'running' },
  { id: '4', name: 'openproject', port: 21725, mem: 1900, status: 'stopped' },
];

function Dashboard() {
  const [step, setStep] = useState(4);
  const [deployed, setDeployed] = useState(false);
  const [events, setEvents] = useState<LogEntry[]>([
    { id: 'ready', timestamp: 'T+00s', level: 'info', source: 'fixture', message: 'Local deployment simulation ready. No infrastructure is connected.' },
  ]);
  const deploying = step < 4;
  useEffect(() => {
    if (step >= 4) return;
    const timer = setTimeout(() => {
      setEvents((previous) => [...previous, {
        id: `${previous.length}-${step}`, timestamp: `T+0${step + 1}s`, level: 'info', source: 'simulation',
        message: ['Fixture image selected.', 'Fixture migrations validated.', 'Fixture containers marked healthy.', 'Local simulation complete. No services changed.'][step],
      }]);
      setStep((previous) => previous + 1);
      if (step === 3) setDeployed(true);
    }, 700);
    return () => clearTimeout(timer);
  }, [step]);
  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        <PageHeader
          title="homelab-nuc-1"
          badge={<Badge tone={deploying ? 'info' : 'success'} dot>{deploying ? 'simulating' : 'fixture ready'}</Badge>}
          description="Intel NUC8i7HVK · 8 vCPU · 30 GiB · nuc8i7hvk.metal"
          actions={<>
            <Drawer title="Simulation event log" trigger={<Button variant="outline">Logs</Button>}>
              <LogViewer entries={events} isStreaming={deploying} />
            </Drawer>
            <ConfirmDialog
              title="Replay a local deployment"
              description="This animates deterministic fixture stages. It does not deploy, restart or contact any service."
              trigger={<Button disabled={deploying}>Simulate redeploy</Button>}
              confirmLabel="Start simulation"
              destructive={false}
              onConfirm={() => { setStep(0); setDeployed(false); }}
            />
          </>}
          flush
        />
      </motion.div>

      {/* The band arrives as one gesture; the numbers then count to place. */}
      <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 90 }}>
        <MetricRow>
          <CountingMetric label="CPU" to={18} unit="%" delay={delayFor(0)} caption="vs. 1h ago"
            chart={<Sparkline values={cpu} />} />
          <CountingMetric label="Memory" to={21.4} unit="GiB" decimals={1} delay={delayFor(1)} caption="of 30 GiB"
            chart={<Sparkline values={mem} tone="accent" />} />
          <CountingMetric label="Containers" to={43} delay={delayFor(2)} caption="all projects" />
          <CountingMetric label="Uptime" to={3} unit="d" delay={delayFor(3)} caption="since last boot" />
        </MetricRow>
      </motion.div>

      <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))' }}>
        <Reveal amount={0.2}>
          <h2 className="dhk-eyebrow" style={{ marginBottom: '0.75rem' }}>Instance</h2>
          <StatList
            stats={[
              { label: 'Instance ID', value: <span className="dhk-mono">i-60b786b1ac524aa6b</span> },
              { label: 'Type', value: <span className="dhk-mono">nuc8i7hvk.metal</span> },
              { label: 'AZ', value: <span className="dhk-mono">homelab-nuc-1a</span> },
            ]}
          />
        </Reveal>

        <Reveal amount={0.2} style={{ display: 'block' }}>
          <h2 className="dhk-eyebrow" style={{ marginBottom: '0.75rem' }}>Recent activity</h2>
          <ActivityFeed
            items={[
              { id: 1, marker: <Avatar name="David Poyner" size="sm" />, actor: 'dhaakon-ubuntu',
                action: 'published', target: <code className="dhk-mono">@dhaakon/ui</code>, time: '2m' },
              { id: 2, marker: <FeaturedIcon size="sm" tone="success">✓</FeaturedIcon>, actor: 'CI',
                action: 'deployed', target: 'docs', time: '14m' },
              { id: 3, marker: <FeaturedIcon size="sm" tone="danger">!</FeaturedIcon>, actor: 'openproject',
                action: 'failed a health check', time: '1h' },
            ]}
          />
        </Reveal>
      </div>

      <Reveal amount={0.15} style={{ display: 'block' }}>
        <ProgressSteps
          current={step}
          steps={[
            { title: 'Pull image' },
            { title: 'Run migrations' },
            { title: 'Start containers', description: deploying ? 'Simulated health checks…' : 'Local fixture only' },
            { title: 'Swap traffic' },
          ]}
        />
      </Reveal>

      <Reveal amount={0.1} style={{ display: 'block' }}>
        <DataGrid
          toolbar={<FilterBar resultCount="4 of 43" applied={[{ id: 's', label: 'status: any' }]} />}
        >
          <DataTable aria-label="Services">
            <DataTableHeader>
              <DataColumn id="name" isRowHeader>Service</DataColumn>
              <DataColumn id="port" numeric>Port</DataColumn>
              <DataColumn id="mem" numeric>Memory (MiB)</DataColumn>
              <DataColumn id="status">Status</DataColumn>
            </DataTableHeader>
            <DataTableBody>
              {ROWS.map((r) => (
                <DataRow key={r.id} id={r.id}>
                  <DataCell>{r.name}</DataCell>
                  <DataCell numeric>{r.port}</DataCell>
                  <DataCell numeric>{r.mem.toLocaleString()}</DataCell>
                  <DataCell>
                    <Badge tone={deployed || r.status === 'running' ? 'success' : 'danger'} dot>{deployed ? 'running' : r.status}</Badge>
                  </DataCell>
                </DataRow>
              ))}
            </DataTableBody>
          </DataTable>
        </DataGrid>
      </Reveal>
      <p role="status" className="doc-p">{deploying ? `Simulating deployment: stage ${step + 1} of 4.` : deployed ? 'Simulation complete. Fixture service states updated; no infrastructure changed.' : 'Local fixture ready. Open logs or simulate a deployment.'}</p>
    </div>
  );
}

export function Showcase() {
  const [run, setRun] = useState(0);
  const [reduce, setReduce] = useState(false);

  return (
    <>
      <h1 className="doc-h1">Compositions in motion</h1>
      <p className="dhk-eyebrow">Interactive local simulation · no infrastructure connection</p>
      <p className="doc-lede">
        The same composites from the gallery, assembled into one screen and animated with{' '}
        <code className="doc-inline">@dhaakon/motion</code>. Nothing here is a bespoke animation:
        it is <code className="doc-inline">motion.*</code> for entrances,{' '}
        <code className="doc-inline">stagger</code> for the metric band,{' '}
        <code className="doc-inline">useTween</code> for the counters and{' '}
        <code className="doc-inline">Reveal</code> for everything below the fold.
      </p>

      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap', margin: '1.5rem 0 2rem' }}>
        <Button variant="outline" onClick={() => setRun((n) => n + 1)}>Replay</Button>
        <Switch isSelected={reduce} onChange={setReduce}>Force reduced motion</Switch>
      </div>

      {/* Remounting on `run` restarts every entrance from its initial state. */}
      <MotionConfig transition={{ duration: 460, easing: 'dhaakon' }} reducedMotion={reduce ? 'always' : 'user'}>
        <div
          key={`${run}-${reduce}`}
          style={{ border: '1px solid var(--dhk-border)', padding: 'var(--dhk-space-6)', background: 'var(--dhk-surface)' }}
        >
          <Dashboard />
        </div>
      </MotionConfig>

      <h2 className="doc-h2">How it is put together</h2>
      <p className="doc-p">
        Four techniques, each doing the job it is best at. The rule of thumb:
        animate a <em>style</em> with <code className="doc-inline">motion.*</code>, because it writes
        to the DOM without rerendering; animate a <em>value</em> with{' '}
        <code className="doc-inline">useTween</code>, because React needs to see it.
      </p>
      <CodeBlock
        standalone
        code={`import { stagger } from '@dhaakon/motion';
import { MotionConfig, Reveal, motion, useTween } from '@dhaakon/motion/react';

const delayFor = stagger(70);

// 1 · One house transition for the whole screen.
<MotionConfig transition={{ duration: 460, easing: 'dhaakon' }}>

  // 2 · Entrances: the element animates, React does not rerender.
  <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
    <PageHeader … />
  </motion.div>

  // 3 · The counter is content, so it goes through state.
  const { value } = useTween(0, 21.4, { duration: 900, delay: delayFor(1) });
  <MetricTile label="Memory" value={value.toFixed(1)} unit="GiB" />

  // 4 · Below the fold, wait until it is actually seen.
  <Reveal amount={0.2}>
    <ActivityFeed … />
  </Reveal>

</MotionConfig>`}
      />

      <h2 className="doc-h2">Reduced motion</h2>
      <p className="doc-p">
        Flip the switch above. <code className="doc-inline">Reveal</code> resolves immediately and
        tween durations collapse to zero, so every composite lands in its final state rather than
        being trapped behind an animation that will not run. That is the default behaviour under{' '}
        <code className="doc-inline">reducedMotion="user"</code> whenever the reader's system asks
        for it — the switch just forces the same path so you can check it.
      </p>
    </>
  );
}
