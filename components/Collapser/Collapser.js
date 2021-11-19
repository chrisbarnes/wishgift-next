import * as Collapsible from "@radix-ui/react-collapsible";
import ToggleButton from "./ToggleButton";

const Collapser = ({ triggerText, children }) => {
  return (
    <Collapsible.Root className="mb-8">
      <Collapsible.Trigger>
        <ToggleButton text={triggerText} />
      </Collapsible.Trigger>
      <Collapsible.Content>{children}</Collapsible.Content>
    </Collapsible.Root>
  );
};

export default Collapser;
