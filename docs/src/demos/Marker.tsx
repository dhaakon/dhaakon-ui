import { GLYPHS, Marker } from "@dhaakon/ui/site";
export default function Demo() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
      {Object.entries(GLYPHS).map(([name, glyph]) => (
        <span key={name}>
          <Marker tone="accent">{glyph}</Marker> <code>{name}</code>
        </span>
      ))}
    </div>
  );
}
