import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useReducedMotion } from "@dhaakon/motion/react";
import {
  Badge,
  Button,
  Drawer,
  MultiSelect,
  SearchField,
  Slider,
} from "@dhaakon/ui";
import {
  CodeSnippet,
  LogViewer,
  TelemetryChart,
  type LogEntry,
} from "@dhaakon/ui/app";
import "../workbench.css";

type Experiment = {
  id: string;
  title: string;
  category: string;
  node: string;
  seed: number;
  description: string;
};
const experiments: Experiment[] = [
  {
    id: "EXP-041",
    title: "Signal reconstruction",
    category: "signal",
    node: "research-01",
    seed: 17,
    description:
      "A deterministic vector field reconstructed from twelve sampled control points.",
  },
  {
    id: "EXP-042",
    title: "Inference envelope",
    category: "agents",
    node: "compute-02",
    seed: 29,
    description:
      "A fixture study of how a bounded task moves through an inference pipeline.",
  },
  {
    id: "EXP-043",
    title: "Frame convergence",
    category: "motion",
    node: "render-01",
    seed: 43,
    description:
      "A sampled convergence profile for a procedural motion-graphics experiment.",
  },
  {
    id: "EXP-044",
    title: "Retrieval quality",
    category: "agents",
    node: "research-01",
    seed: 61,
    description:
      "An illustrative quality profile for a research retrieval experiment.",
  },
  {
    id: "EXP-045",
    title: "Mask topology",
    category: "motion",
    node: "render-01",
    seed: 79,
    description:
      "A geometric field that exposes the relationship between mask density and signal amplitude.",
  },
];
const categoryOptions = [
  { id: "signal", label: "Signal" },
  { id: "agents", label: "Agents" },
  { id: "motion", label: "Motion" },
];
const sampleCount = 24;
const sampleLabels = Array.from(
  { length: sampleCount },
  (_, index) => `S${String(index + 1).padStart(2, "0")}`,
);
function makeSamples(seed: number, gain: number) {
  return Array.from({ length: sampleCount }, (_, index) =>
    Number(
      (
        gain *
        (46 +
          16 * Math.sin((index + seed) * 0.61) +
          8 * Math.cos(index * 0.29 + seed))
      ).toFixed(2),
    ),
  );
}
const initialEvents: LogEntry[] = [
  {
    id: "ready",
    timestamp: "00:00.000",
    level: "info",
    source: "fixture",
    message: "Local fixture loaded. No homelab services are connected.",
  },
  {
    id: "method",
    timestamp: "00:00.001",
    level: "debug",
    source: "method",
    message:
      "Deterministic samples. Change a parameter, run, inspect, and export.",
  },
];

function SignalField({
  seed,
  gain,
  sample,
}: {
  seed: number;
  gain: number;
  sample: number;
}) {
  const paths = useMemo(
    () =>
      Array.from({ length: 19 }, (_, line) =>
        Array.from({ length: 61 }, (_, point) => {
          const x = point * 10;
          const envelope = Math.sin((point / 60) * Math.PI);
          const y =
            35 +
            line * 12 +
            Math.sin(
              point * 0.115 + line * 0.16 + seed * 0.05 + sample * 0.07,
            ) *
              envelope *
              38 *
              gain;
          return `${point === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
        }).join(" "),
      ),
    [seed, gain, sample],
  );
  return (
    <svg viewBox="0 0 600 300" className="wb-field" aria-hidden="true">
      <g stroke="currentColor" strokeOpacity=".12" fill="none">
        {Array.from({ length: 13 }, (_, i) => (
          <path key={i} d={`M${i * 50} 0V300`} />
        ))}
        {Array.from({ length: 7 }, (_, i) => (
          <path key={i} d={`M0 ${i * 50}H600`} />
        ))}
        <circle cx="300" cy="150" r="103" />
        <circle cx="300" cy="150" r="69" />
      </g>
      <g fill="none" strokeWidth=".8">
        {paths.map((path, index) => (
          <path
            key={index}
            d={path}
            stroke={index === 9 ? "#d9ff43" : "currentColor"}
            opacity={index === 9 ? 1 : 0.35 + (index % 3) * 0.13}
          />
        ))}
      </g>
      <path
        d={`M${25 + sample * 22} 15V285`}
        stroke="#ff8251"
        strokeWidth=".7"
        strokeDasharray="3 5"
      />
      <g fill="currentColor" fontFamily="monospace" fontSize="9">
        <text x="16" y="20">
          DETERMINISTIC FIELD / SEED {seed}
        </text>
        <text x="16" y="286">
          GAIN {gain.toFixed(2)} / SAMPLE {String(sample).padStart(2, "0")}
        </text>
        <text x="493" y="286">
          DHK / RESEARCH
        </text>
      </g>
    </svg>
  );
}

export function Workbench() {
  const [selectedId, setSelectedId] = useState(experiments[0].id);
  const [query, setQuery] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [gain, setGain] = useState(1);
  const [sample, setSample] = useState(0);
  const [running, setRunning] = useState(false);
  const [inspector, setInspector] = useState(false);
  const [events, setEvents] = useState<LogEntry[]>(initialEvents);
  const [announcement, setAnnouncement] = useState(
    "Fixture ready. Choose a study or run this experiment.",
  );
  const eventId = useRef(0);
  const downloadUrls = useRef(new Set<string>());
  const downloadTimers = useRef(new Set<number>());
  const reducedMotion = useReducedMotion();
  const selected = experiments.find(
    (experiment) => experiment.id === selectedId,
  )!;
  const samples = useMemo(
    () => makeSamples(selected.seed, gain),
    [selected.seed, gain],
  );
  const reference = useMemo(
    () => makeSamples(selected.seed, 1),
    [selected.seed],
  );
  const visible = experiments.filter(
    (experiment) =>
      (!categories.length || categories.includes(experiment.category)) &&
      `${experiment.id} ${experiment.title} ${experiment.node}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );

  function log(
    message: string,
    level: LogEntry["level"] = "info",
    source = "workbench",
  ) {
    const id = ++eventId.current;
    setEvents((current) =>
      [
        ...current,
        {
          id: `event-${id}`,
          timestamp: `EVT ${String(id).padStart(3, "0")}`,
          level,
          source,
          message,
        },
      ].slice(-120),
    );
  }

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(
      () => setSample((current) => Math.min(sampleCount, current + 1)),
      160,
    );
    return () => window.clearInterval(timer);
  }, [running]);

  useEffect(() => {
    if (!running || sample < sampleCount) return;
    setRunning(false);
    const message = `${selected.id} completed. ${sampleCount} deterministic samples available for export.`;
    log(message, "info", "runner");
    setAnnouncement(message);
  }, [sample, running, selected.id]);

  useEffect(
    () => () => {
      for (const timer of downloadTimers.current) window.clearTimeout(timer);
      downloadTimers.current.clear();
      for (const url of downloadUrls.current) URL.revokeObjectURL(url);
      downloadUrls.current.clear();
    },
    [],
  );

  function choose(experiment: Experiment, inspect = false) {
    if (experiment.id !== selectedId) {
      setRunning(false);
      setSample(0);
      setSelectedId(experiment.id);
      log(`Selected ${experiment.id}: ${experiment.title}.`, "debug");
      setAnnouncement(`${experiment.title} selected. Ready to run.`);
    }
    if (inspect) setInspector(true);
  }

  function run() {
    setSample(0);
    setRunning(true);
    log(
      `Started ${selected.id}; seed=${selected.seed}; gain=${gain.toFixed(2)}.`,
      "info",
      "runner",
    );
    setAnnouncement(`Running ${selected.title}. Local simulation only.`);
  }

  function stop() {
    setRunning(false);
    log(`Stopped ${selected.id} after ${sample} samples.`, "warn", "runner");
    setAnnouncement(
      `Stopped at sample ${sample}. Partial results can be exported.`,
    );
  }

  const manifest = {
    schema: "dhaakon.research-fixture/v1",
    source: "local-simulation",
    experiment: selected.id,
    title: selected.title,
    seed: selected.seed,
    gain,
    sampleCount: sample,
    state: running
      ? "running"
      : sample === sampleCount
        ? "complete"
        : sample
          ? "stopped"
          : "ready",
    unit: "signal units",
    samples: samples.slice(0, sample),
  };

  function exportResult() {
    const blob = new Blob([JSON.stringify({ ...manifest, events }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    downloadUrls.current.add(url);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${selected.id.toLowerCase()}-fixture.json`;
    link.click();
    // Keep the URL alive until the browser has started its download, then release it.
    const timer = window.setTimeout(() => {
      URL.revokeObjectURL(url);
      downloadUrls.current.delete(url);
      downloadTimers.current.delete(timer);
    }, 1000);
    downloadTimers.current.add(timer);
    log(
      `Exported ${sample} samples and fixture provenance as JSON.`,
      "info",
      "artifact",
    );
    setAnnouncement(
      "JSON export requested. The file contains fixture data and its parameters.",
    );
  }

  return (
    <div className="wb-page">
      <div className="doc-kicker">Study 01 / An interface for inquiry</div>
      <header className="wb-page-header">
        <div>
          <h1 className="doc-editorial-title">
            Research <em>workbench.</em>
          </h1>
          <p className="doc-lede">
            A question, a controlled experiment, and an inspectable result.
            Built from the kit.
          </p>
        </div>
        <span className="wb-edition">
          DHK / LAB
          <br />
          INSTRUMENT 001
        </span>
      </header>
      <div className="wb-disclosure">
        <span className="wb-disclosure__dot" aria-hidden />
        <strong>Local simulation</strong>
        <span>
          Deterministic fixture data. No network, cluster, or live
          infrastructure connection.
        </span>
      </div>
      <div className="wb-console">
        <header className="wb-console__head">
          <div>
            <span className="doc-kicker">
              {selected.id} / {selected.category}
            </span>
            <h2>{selected.title}</h2>
          </div>
          <div className="wb-actions">
            <Badge
              tone={
                running
                  ? "warning"
                  : sample === sampleCount
                    ? "success"
                    : "neutral"
              }
              dot
            >
              {running
                ? "running fixture"
                : sample === sampleCount
                  ? "complete"
                  : sample
                    ? "stopped"
                    : "ready"}
            </Badge>
            {running ? (
              <Button onClick={stop}>Stop experiment</Button>
            ) : (
              <Button variant="accent" onClick={run}>
                Run experiment ↗
              </Button>
            )}
          </div>
        </header>
        <div className="wb-instrument-grid">
          <div className="wb-visual">
            <SignalField
              seed={selected.seed}
              gain={gain}
              sample={reducedMotion ? 0 : sample}
            />
            <div className="wb-visual__caption">
              <span>01 / Analytic vector field</span>
              <span>Illustration of current parameters</span>
            </div>
          </div>
          <div className="wb-parameters">
            <div className="doc-kicker">Control surface</div>
            <p>{selected.description}</p>
            <Slider
              label="Signal gain"
              minValue={0.5}
              maxValue={1.5}
              step={0.05}
              value={gain}
              isDisabled={running}
              onChange={(value) => {
                setGain(value);
                setSample(0);
                setAnnouncement(
                  `Gain set to ${value.toFixed(2)}. Run to collect new samples.`,
                );
              }}
            />
            <dl>
              <div>
                <dt>Fixture node</dt>
                <dd>{selected.node}</dd>
              </div>
              <div>
                <dt>Seed</dt>
                <dd>{selected.seed}</dd>
              </div>
              <div>
                <dt>Samples captured</dt>
                <dd>
                  {String(sample).padStart(2, "0")} / {sampleCount}
                </dd>
              </div>
            </dl>
            <div
              className="wb-progress"
              role="progressbar"
              aria-label="Experiment samples captured"
              aria-valuemin={0}
              aria-valuemax={sampleCount}
              aria-valuenow={sample}
            >
              <span style={{ width: `${(sample / sampleCount) * 100}%` }} />
            </div>
            <div className="wb-actions">
              <Button variant="outline" onClick={() => setInspector(true)}>
                Inspect manifest
              </Button>
              <Button
                variant="ghost"
                onClick={exportResult}
                disabled={!sample || running}
              >
                Export JSON ↗
              </Button>
            </div>
          </div>
        </div>
        <div className="wb-chart">
          <TelemetryChart
            title="Signal envelope"
            description="Reference uses gain 1.00; the captured series contains only samples collected by the local runner."
            labels={sampleLabels}
            unit="signal units"
            series={[
              {
                id: "reference",
                label: "Reference · gain 1.00",
                values: reference,
                tone: "neutral",
              },
              {
                id: "captured",
                label: `Captured · gain ${gain.toFixed(2)}`,
                values: samples.map((value, index) =>
                  index < sample ? value : null,
                ),
                tone: "info",
              },
            ]}
          />
        </div>
      </div>
      <p className="wb-announcement" role="status" aria-live="polite">
        {announcement}
      </p>
      <section className="wb-registry" aria-labelledby="experiment-title">
        <div className="doc-section-label">
          <span>[ 02 / Experiment registry ]</span>
          <span>
            {visible.length} of {experiments.length} fixtures
          </span>
        </div>
        <h2 id="experiment-title">Choose the next question.</h2>
        <div className="wb-filters">
          <SearchField
            label="Search experiments"
            placeholder="Name, identifier, or node…"
            value={query}
            onChange={setQuery}
          />
          <MultiSelect
            label="Research disciplines"
            options={categoryOptions}
            value={categories}
            onChange={setCategories}
            description="No selection includes all disciplines."
          />
        </div>
        <div
          className="wb-table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Experiment registry table"
        >
          <table className="wb-table">
            <thead>
              <tr>
                <th scope="col">Experiment</th>
                <th scope="col">Discipline</th>
                <th scope="col">Fixture node</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((experiment) => (
                <tr
                  key={experiment.id}
                  data-selected={selectedId === experiment.id || undefined}
                >
                  <th scope="row">
                    <span>{experiment.id}</span>
                    {experiment.title}
                  </th>
                  <td>{experiment.category}</td>
                  <td>
                    <code>{experiment.node}</code>
                  </td>
                  <td>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => choose(experiment, true)}
                      aria-label={`Inspect ${experiment.title}`}
                    >
                      {selectedId === experiment.id
                        ? "Selected / inspect ↗"
                        : "Select / inspect ↗"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!visible.length && (
            <div className="wb-empty">
              <h3>No experiments match.</h3>
              <p>Try another search or clear the discipline filter.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setCategories([]);
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </div>
      </section>
      <section className="wb-events" aria-labelledby="events-title">
        <div className="doc-section-label">
          <span>[ 03 / Evidence trail ]</span>
          <span>Local events / no remote log stream</span>
        </div>
        <h2 id="events-title">Keep the reasoning close.</h2>
        <LogViewer
          entries={events}
          label="Experiment event log"
          isStreaming={running}
          maxEntries={120}
        />
      </section>
      <Drawer
        title={`${selected.id} / Experiment manifest`}
        description="Reproducibility record for a local fixture. This is not an infrastructure control panel."
        isOpen={inspector}
        onOpenChange={setInspector}
        footer={
          <div className="wb-actions">
            <Button variant="outline" onClick={() => setInspector(false)}>
              Return to workbench
            </Button>
            <Button onClick={exportResult} disabled={!sample || running}>
              Export JSON
            </Button>
          </div>
        }
      >
        <p>{selected.description}</p>
        <CodeSnippet
          title="Fixture manifest"
          language="json"
          code={JSON.stringify(manifest, null, 2)}
        />
        <p className="doc-p">
          Seed and gain fully determine these sample values. Running collects
          the same 24 values each time; no stochastic or live measurements are
          claimed.
        </p>
      </Drawer>
      <div className="wb-colophon">
        <p>
          Built with <Link to="/components/multi-select">MultiSelect</Link>,{" "}
          <Link to="/components/slider">Slider</Link>,{" "}
          <Link to="/components/drawer">Drawer</Link>,{" "}
          <Link to="/components/telemetry-chart">TelemetryChart</Link>,{" "}
          <Link to="/components/code-snippet">CodeSnippet</Link>, and{" "}
          <Link to="/components/log-viewer">LogViewer</Link>.
        </p>
        <p>
          The vector field is decorative. Parameters, numerical samples, and
          progress remain available without motion or sight.
        </p>
      </div>
    </div>
  );
}
