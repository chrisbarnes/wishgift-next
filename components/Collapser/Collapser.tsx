import { ReactNode } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import ToggleButton from "./ToggleButton";

interface CollapserProps {
  triggerText: string;
  children: ReactNode;
}

const Collapser = ({ triggerText, children }: CollapserProps) => {
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
