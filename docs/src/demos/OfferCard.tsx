import { OfferCard } from "@dhaakon/ui/site";
export default function Demo() {
  return (
    <OfferCard
      index="01"
      title="From question to prototype"
      subtitle="Illustrative programme"
      description="A focused research workflow assembled from the kit."
      includes={[
        "Frame the uncertainty",
        "Build the instrument",
        "Export the evidence",
      ]}
      cta={{ label: "Open the workbench", href: "#/workbench" }}
    />
  );
}
