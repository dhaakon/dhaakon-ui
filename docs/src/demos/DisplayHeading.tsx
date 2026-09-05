import { DisplayHeading } from "@dhaakon/ui/site";
export default function Demo() {
  return (
    <DisplayHeading
      as="h2"
      style={{ fontSize: "clamp(2.3rem, 6vw, 4.5rem)" }}
      annotations={[{ text: "research", glyph: "arrow-ne", x: 65, y: 105 }]}
    >
      A question.
      <br />
      An instrument.
    </DisplayHeading>
  );
}
