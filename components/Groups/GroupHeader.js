import React from "react";

const GroupHeader = ({ name, description }) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
    </div>
  );
};

export default GroupHeader;
