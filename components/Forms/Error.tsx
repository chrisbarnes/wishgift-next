import React from "react";
import { FieldErrors } from "react-hook-form";

interface ErrorProps {
  errors: FieldErrors;
  name: string;
}

const Error = ({ errors, name }: ErrorProps) => {
  if (!errors[name]) {
    return null;
  }

  return <span className="text-sm text-red-700">This field is required</span>;
};

export default Error;
