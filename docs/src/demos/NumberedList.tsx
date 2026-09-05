import { NumberedItem, NumberedList } from "@dhaakon/ui/site";
export default function Demo() {
  return (
    <NumberedList>
      <NumberedItem
        index="01"
        title="Build the instrument."
        equation="Prototype → evidence"
        defaultOpen
      >
        A small working system makes a question observable.
      </NumberedItem>
      <NumberedItem
        index="02"
        title="Transfer the practice."
        equation="Context + code"
      >
        Document enough that a collaborator can make the next decision.
      </NumberedItem>
    </NumberedList>
  );
}
