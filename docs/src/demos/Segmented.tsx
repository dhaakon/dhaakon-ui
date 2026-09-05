import { useState } from "react";
import { Segmented } from "@dhaakon/ui/site";
export default function Demo() {
  const [value, setValue] = useState("make");
  return (
    <>
      <Segmented
        aria-label="Practice perspective"
        value={value}
        onValueChange={setValue}
        options={[
          { value: "make", label: "Make" },
          { value: "question", label: "Question" },
          { value: "transfer", label: "Transfer" },
        ]}
      />
      <p aria-live="polite">
        {value === "make"
          ? "Build a working instrument."
          : value === "question"
            ? "Inspect what the result actually tells you."
            : "Document the pattern for the next person."}
      </p>
    </>
  );
}
