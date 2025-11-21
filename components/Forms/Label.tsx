import React from "react";
import { Label as ShadcnLabel } from "@/components/ui/label";

interface LabelProps {
  label: string;
  id: string;
}

const Label = ({ label, id }: LabelProps) => {
  return (
    <ShadcnLabel htmlFor={id} className="mb-2">
      {label}
    </ShadcnLabel>
  );
};

export default Label;
