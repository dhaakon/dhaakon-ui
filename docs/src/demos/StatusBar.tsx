import { StatusBar } from "@dhaakon/ui/site";
export default function Demo() {
  return (
    <StatusBar
      status="Fixture workspace"
      pulse={false}
      items={["Local simulation", "No live connection"]}
    />
  );
}
