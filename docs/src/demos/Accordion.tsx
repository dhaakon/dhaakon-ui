import { Accordion, AccordionItem } from '@dhaakon/ui';

export default function Demo() {
  return (
    <Accordion defaultExpandedKeys={['a']}>
      <AccordionItem id="a" title="Compute">Intel i7-8809G · 4 cores / 8 threads · 3.10 GHz</AccordionItem>
      <AccordionItem id="b" title="Memory">30 GiB total · 21 GiB used · 8 GiB swap</AccordionItem>
      <AccordionItem id="c" title="Storage">Samsung 970 EVO Plus 500 GB · 19% used</AccordionItem>
    </Accordion>
  );
}
