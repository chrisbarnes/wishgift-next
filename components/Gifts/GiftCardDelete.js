import React from "react";

const GiftCardDelete = ({ handleDeleteGiftToggle }) => {
  return (
    <div className="">
      <p>Are you sure?</p>
      <button onClick={handleDeleteGiftToggle}>Cancel</button>
      <button onClick={handleDeleteGiftToggle}>Delete</button>
    </div>
  );
};

export default GiftCardDelete;
