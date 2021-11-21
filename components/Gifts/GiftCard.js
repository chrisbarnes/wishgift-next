import { useState } from "react";
import GiftCardDelete from "./GiftCardDelete";
import GiftCardEdit from "./GiftCardEdit";
import GiftCardView from "./GiftCardView";

const GiftCard = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleEditGiftToggle = () => {
    setIsEditing(!isEditing);
  };
  const handleDeleteGiftToggle = () => {
    setIsDeleting(!isDeleting);
  };

  const cardStyle = !isEditing ? { maxHeight: "204px" } : {};

  return (
    <div
      className="mb-4 md:mb-0 px-6 py-4 shadow-md rounded-md flex flex-col bg-white"
      style={cardStyle}
    >
      {!isEditing && !isDeleting && (
        <GiftCardView
          {...props}
          handleEditGiftClick={handleEditGiftToggle}
          handleDeleteGiftClick={handleDeleteGiftToggle}
          update={props.updated}
        />
      )}
      {isEditing && (
        <GiftCardEdit
          gift={props}
          handleEditGiftToggle={handleEditGiftToggle}
          editedCallback={props.updated}
        />
      )}
      {isDeleting && (
        <GiftCardDelete
          giftId={props.id}
          handleDeleteGiftToggle={handleDeleteGiftToggle}
          deletedCallback={props.updated}
        />
      )}
    </div>
  );
};

export default GiftCard;
