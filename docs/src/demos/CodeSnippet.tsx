import { CodeSnippet } from "@dhaakon/ui/app";
export default function Demo() {
  return (
    <CodeSnippet
      title="Experiment manifest"
      language="json"
      code={JSON.stringify(
        {
          schema: "dhaakon.research-fixture/v1",
          seed: 17,
          source: "local-simulation",
          gain: 1,
        },
        null,
        2,
      )}
    />
  );
}
