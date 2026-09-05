import { Link } from "react-router-dom";
import { COMPONENTS, LAYERS, MOTION_DOCS_URL, byLayer } from "../lib/registry";
import { CodeBlock } from "../parts/CodeBlock";

const kitCount = COMPONENTS.filter(
  (component) => component.layer !== "motion",
).length;
const ariaCount = COMPONENTS.filter((component) => component.aria).length;

function SignalStudy() {
  return (
    <svg
      className="doc-signal-study"
      viewBox="0 0 480 390"
      role="img"
      aria-label="Vector study: four signal paths converge into a research instrument"
    >
      <defs>
        <pattern
          id="home-study-grid"
          width="30"
          height="30"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M30 0H0V30"
            fill="none"
            stroke="currentColor"
            strokeOpacity=".12"
          />
        </pattern>
      </defs>
      <rect width="480" height="390" fill="url(#home-study-grid)" />
      <g fill="none" stroke="currentColor" strokeWidth=".8">
        {[46, 72, 98, 124, 150].map((r) => (
          <circle
            key={r}
            cx="240"
            cy="195"
            r={r}
            opacity={r === 98 ? 0.55 : 0.18}
          />
        ))}
        <path
          d="M18 195H462M240 15V375M78 33L402 357M402 33L78 357"
          opacity=".22"
        />
        {Array.from({ length: 16 }, (_, index) => (
          <path
            key={index}
            d={`M20 ${100 + index * 12} C150 ${index * 19}, 240 ${365 - index * 12}, 460 ${85 + index * 13}`}
            stroke={index === 7 ? "#d9ff43" : "currentColor"}
            opacity={index === 7 ? 1 : 0.3}
          />
        ))}
      </g>
      <g fill="#101010" stroke="#d9ff43">
        <rect
          x="226"
          y="181"
          width="28"
          height="28"
          transform="rotate(45 240 195)"
        />
        <circle cx="91" cy="163" r="5" />
        <circle cx="387" cy="260" r="5" />
      </g>
      <g fill="currentColor" fontSize="9" fontFamily="monospace">
        <text x="18" y="25">
          FIG. 001 / SIGNAL → SYSTEM
        </text>
        <text x="18" y="372">
          VECTOR STUDY / NOT LIVE TELEMETRY
        </text>
        <text x="367" y="25">
          DHK / LAB
        </text>
      </g>
      <circle cx="240" cy="195" r="3" fill="#d9ff43" />
    </svg>
  );
}

export function Home() {
  return (
    <>
      <section className="doc-home-hero" aria-labelledby="home-title">
        <div className="doc-home-hero__copy">
          <p className="doc-kicker">
            The creative technology toolkit / {__KIT_VERSION__}
          </p>
          <h1 id="home-title">
            Serious tools.
            <br />
            <em>Curious minds.</em>
          </h1>
          <p className="doc-home-hero__lead">
            An interface language for the things you haven’t built yet.
          </p>
          <p className="doc-p">
            From the public-facing practice to the private research lab.
            Accessible controls, editorial systems, and precise instruments for
            experiments that become professional work.
          </p>
          <div className="doc-actions">
            <Link className="doc-action doc-action--accent" to="/workbench">
              Enter the workbench ↗
            </Link>
            <Link className="doc-text-link" to="/components">
              Explore the component atlas →
            </Link>
          </div>
        </div>
        <div className="doc-home-hero__study">
          <SignalStudy />
          <div className="doc-home-hero__caption">
            <span>01 / Form follows inquiry</span>
            <span aria-hidden>↗</span>
          </div>
        </div>
      </section>
      <div className="doc-fact-strip" aria-label="System inventory">
        <div>
          <strong>{kitCount}</strong>
          <span>UI documentation entries</span>
        </div>
        <div>
          <strong>{ariaCount}</strong>
          <span>React Aria integrations</span>
        </div>
        <div>
          <strong>03</strong>
          <span>Kit layers / one language</span>
        </div>
        <div>
          <strong>∞</strong>
          <span>Questions worth building for</span>
        </div>
      </div>
      <section className="doc-home-section" aria-labelledby="studies-title">
        <div className="doc-section-label">
          <span>[ 01 / In practice ]</span>
          <span>Made to be used, not just viewed</span>
        </div>
        <h2 id="studies-title" className="doc-editorial-title">
          The component is only
          <br />
          the <em>beginning.</em>
        </h2>
        <div className="doc-study-grid">
          <Link
            to="/workbench"
            className="doc-study-card doc-study-card--instrument"
          >
            <span className="doc-study-card__index">STUDY 01 / RESEARCH</span>
            <div className="doc-mini-signal" aria-hidden>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
            <h3>Operate the experiment.</h3>
            <p>
              A working local simulation: run a signal study, filter
              experiments, inspect parameters, and export the evidence.
            </p>
            <span className="doc-study-card__action">Open workbench ↗</span>
          </Link>
          <Link to="/editorial" className="doc-study-card">
            <span className="doc-study-card__index">STUDY 02 / PRACTICE</span>
            <div className="doc-type-study" aria-hidden>
              Aa<span>↘</span>
            </div>
            <h3>Give the work a voice.</h3>
            <p>
              Expressive typography, numbered methods, field notes, and a visual
              language that carries from dhaakon.com.
            </p>
            <span className="doc-study-card__action">
              Read the field guide ↗
            </span>
          </Link>
          <a
            href={`${MOTION_DOCS_URL}/svg-cue-sheet`}
            className="doc-study-card doc-study-card--motion"
          >
            <span className="doc-study-card__index">STUDY 03 / MOTION</span>
            <div className="doc-orbit-study" aria-hidden>
              <span />
              <i />
              <b>24</b>
            </div>
            <h3>Design in time.</h3>
            <p>
              The companion motion system: an inspectable SVG score and a 1080p
              offline master, side by side at 24 fps.
            </p>
            <span className="doc-study-card__action">
              Explore Ink / Signal ↗
            </span>
          </a>
        </div>
      </section>
      <section className="doc-home-section" aria-labelledby="layers-title">
        <div className="doc-section-label">
          <span>[ 02 / Architecture ]</span>
          <span>One foundation. Different scales.</span>
        </div>
        <h2 id="layers-title" className="doc-editorial-title">
          From a control
          <br />
          to a <em>complete practice.</em>
        </h2>
        <div className="doc-layer-list">
          {LAYERS.filter((layer) => layer.id !== "motion").map(
            (layer, index) => (
              <div className="doc-layer-row" key={layer.id}>
                <span className="doc-kicker">0{index + 1}</span>
                <div>
                  <h3>{layer.label}</h3>
                  <code>{layer.entry}</code>
                </div>
                <p>{layer.blurb}</p>
                <span>{byLayer(layer.id).length} entries</span>
              </div>
            ),
          )}
        </div>
        <p className="doc-p">
          Counts refer to documentation entries, not an accessibility
          certification or every named export. The motion package is a separate
          system; the three UI layers share tokens, behavior conventions, and
          the same visual intent.
        </p>
      </section>
      <section
        className="doc-home-section doc-principles"
        aria-labelledby="principles-title"
      >
        <div>
          <p className="doc-kicker">[ 03 / Working principles ]</p>
          <h2 id="principles-title">
            Craft is what
            <br />
            survives <em>use.</em>
          </h2>
        </div>
        <div>
          <article>
            <h3>Behavior is part of the design.</h3>
            <p>
              Keyboard operation, focus, validation, and readable data
              alternatives belong in the component—not in a future clean-up
              sprint.
            </p>
          </article>
          <article>
            <h3>Evidence over decoration.</h3>
            <p>
              Controls do something. Data is identified as real or simulated.
              Motion clarifies a change, and reduced motion preserves the
              result.
            </p>
          </article>
          <article>
            <h3>Built to travel.</h3>
            <p>
              Typed APIs, source-backed examples, separate entry points, and a
              shared token system keep the work understandable to people and
              coding agents.
            </p>
          </article>
        </div>
      </section>
      <section className="doc-home-section" aria-labelledby="start-title">
        <div className="doc-section-label">
          <span>[ 04 / Start building ]</span>
          <Link to="/install">Installation notes ↗</Link>
        </div>
        <h2 id="start-title" className="doc-editorial-title">
          Your next instrument.
        </h2>
        <CodeBlock
          standalone
          code={`import '@dhaakon/ui/styles.css';
import { DhaakonProvider, Button } from '@dhaakon/ui';
import { TelemetryChart } from '@dhaakon/ui/app';

// Your data. Your workflows. A shared visual language.
<DhaakonProvider>
  <Button onClick={runExperiment}>Run experiment</Button>
  <TelemetryChart title="Latency" unit="ms" labels={sampleLabels}
    series={[{ id: 'inference', label: 'Inference', values: samples }]} />
</DhaakonProvider>`}
        />
      </section>
    </>
  );
}
