import { ProgramCard } from "@dhaakon/ui/site";
export default function Demo() {
  return (
    <ProgramCard
      index={1}
      total={3}
      duration="2-week study"
      name="Research instrument"
      description="Move a useful question into a working prototype."
      points={[
        "Explicit constraints",
        "Inspectable inputs and outputs",
        "Documented methods",
      ]}
      outcome="A reusable pattern and evidence of what it can do."
    />
  );
}
