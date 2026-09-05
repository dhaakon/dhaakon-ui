import { LogoMarquee } from "@dhaakon/ui/site";
export default function Demo() {
  return (
    <LogoMarquee
      logos={["Research", "Craft", "Systems", "People"]}
      aria-label="Working disciplines"
    />
  );
}
