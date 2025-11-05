import React from "react";

interface LabelProps {
  label: string;
  id: string;
}

const Label = ({ label, id }: LabelProps) => {
  return (
    <label
      htmlFor={id}
      className="text-sm font-medium text-gray-900 block mb-2"
    >
      {label}
    </label>
  );
};

export default Label;
