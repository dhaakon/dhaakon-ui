import { Tab, TabList, TabPanel, Tabs } from '@dhaakon/ui';

export default function Demo() {
  return (
    <Tabs defaultValue="instance">
      <TabList label="Console sections">
        <Tab value="instance">Instance</Tab>
        <Tab value="volumes">Volumes</Tab>
        <Tab value="network">Network</Tab>
      </TabList>
      <TabPanel value="instance">8 vCPU · 30 GiB · nuc8i7hvk.metal</TabPanel>
      <TabPanel value="volumes">nvme0n1 — 465.8 GiB SSD, 19% used</TabPanel>
      <TabPanel value="network">tailscale0 · 100.98.68.76</TabPanel>
    </Tabs>
  );
}
