import { TelemetryChart } from "@dhaakon/ui/app";
export default function Demo() {
  return (
    <TelemetryChart
      title="Fixture latency"
      description="Illustrative samples, not a live service measurement. Open the data table for exact values."
      unit="ms"
      labels={["00:00", "00:01", "00:02", "00:03", "00:04", "00:05"]}
      series={[
        {
          id: "local",
          label: "Local fixture",
          tone: "info",
          values: [18, 24, 20, 31, 22, 19],
        },
        {
          id: "reference",
          label: "Reference",
          tone: "neutral",
          values: [22, 22, 23, 24, 23, 22],
        },
      ]}
    />
  );
}
