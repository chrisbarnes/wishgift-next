import React from "react";

const Label = ({ label, id }) => {
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
