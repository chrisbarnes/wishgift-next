import React from "react";

const GroupHeader = ({ name, description }) => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);

  return (
    <div
      className="mb-12 pb-4 border-b-4"
      style={{ borderColor: `#${randomColor}` }}
    >
      <h1 className="text-4xl font-extrabold mb-2 text-gray-700">{name}</h1>
      <p className="text-sm text-black">{description}</p>
    </div>
  );
};

export default GroupHeader;
