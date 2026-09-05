import { Button, Drawer } from "@dhaakon/ui";
export default function Demo() {
  return (
    <Drawer
      title="Experiment details"
      description="A contextual inspector with modal focus management."
      trigger={<Button variant="outline">Inspect experiment</Button>}
      footer={(close) => <Button onClick={close}>Done</Button>}
    >
      <p>EXP-041 / Signal reconstruction</p>
      <p>Seed 17. Local fixture. No live infrastructure connection.</p>
    </Drawer>
  );
}
