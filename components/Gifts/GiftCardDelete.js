import React from "react";

const GiftCardDelete = ({ handleDeleteGiftToggle }) => {
  return (
    <div>
      gift card delete <button onClick={handleDeleteGiftToggle}>cancel</button>
    </div>
  );
};

export default GiftCardDelete;
