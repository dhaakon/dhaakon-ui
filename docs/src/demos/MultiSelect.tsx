import { useState } from "react";
import { MultiSelect } from "@dhaakon/ui";
export default function Demo() {
  const [value, setValue] = useState(["research"]);
  return (
    <>
      <MultiSelect
        label="Workspace capabilities"
        value={value}
        onChange={setValue}
        options={[
          {
            id: "research",
            label: "Research",
            description: "Inspect and record evidence",
          },
          {
            id: "render",
            label: "Rendering",
            description: "Produce frame-accurate artifacts",
          },
          {
            id: "agents",
            label: "Agents",
            description: "Build repeatable task workflows",
          },
        ]}
      />
      <p className="doc-p" aria-live="polite">
        Selected: {value.join(", ") || "none"}
      </p>
    </>
  );
}
