import React from "react";

const GroupHeader = ({ name, description }) => {
  return (
    <div>
      <h1 className="text-xl font-extrabold mb-2 text-gray-700">{name}</h1>
      <p className="text-sm text-black">{description}</p>
    </div>
  );
};

export default GroupHeader;
