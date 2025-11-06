import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface CheckboxToggleProps {
  label: string;
  isChecked?: boolean;
  onChange: (checked: boolean) => void;
}

const CheckboxToggle = ({
  label,
  isChecked,
  onChange,
}: CheckboxToggleProps) => {
  return (
    <div className="flex items-center justify-between p-2">
      <Label className="text-xs uppercase font-bold">{label}</Label>
      <Switch
        defaultChecked={isChecked}
        onCheckedChange={onChange}
        className="ml-4"
      />
    </div>
  );
};

export default CheckboxToggle;
