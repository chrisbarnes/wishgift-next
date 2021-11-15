import React from "react";

const Error = ({ errors, name }) => {
  if (!errors[name]) {
    return null;
  }

  return <span className="text-sm text-red-700">This field is required</span>;
};

export default Error;
