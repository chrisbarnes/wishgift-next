import { Button } from "@/components/ui/button";

interface ToggleButtonProps {
  text: string;
}

const ToggleButton = ({ text }: ToggleButtonProps) => {
  return <Button>{text}</Button>;
};

export default ToggleButton;
