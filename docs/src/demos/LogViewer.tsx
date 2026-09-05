import { LogViewer } from "@dhaakon/ui/app";
export default function Demo() {
  return (
    <LogViewer
      label="Fixture event log"
      entries={[
        {
          id: "1",
          timestamp: "00:00.000",
          level: "info",
          source: "runner",
          message: "Local fixture initialized; no live connection.",
        },
        {
          id: "2",
          timestamp: "00:00.160",
          level: "debug",
          source: "sampler",
          message: "Seed 17 / gain 1.00 / first sample collected.",
        },
        {
          id: "3",
          timestamp: "00:00.320",
          level: "warn",
          source: "validator",
          message: "Fixture warning: incomplete run exports partial results.",
        },
        {
          id: "4",
          timestamp: "00:03.840",
          level: "info",
          source: "runner",
          message: "Twenty-four samples complete.",
        },
      ]}
    />
  );
}
