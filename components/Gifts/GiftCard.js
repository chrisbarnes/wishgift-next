import { useState } from "react";
import GiftCardDelete from "./GiftCardDelete";
import GiftCardEdit from "./GiftCardEdit";
import GiftCardView from "./GiftCardView";

const GiftCard = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleEditGiftToggle = () => {
    setIsEditing(!isEditing);
    console.log("editing");
  };
  const handleDeleteGiftToggle = () => {
    setIsDeleting(!isDeleting);
    console.log("deleting");
  };

  const cardStyle = !isEditing ? { maxHeight: "204px" } : {};

  return (
    <div
      className="px-6 py-4 shadow-md rounded-md flex flex-col bg-white"
      style={cardStyle}
    >
      {!isEditing && !isDeleting && (
        <GiftCardView
          {...props}
          handleEditGiftClick={handleEditGiftToggle}
          handleDeleteGiftClick={handleDeleteGiftToggle}
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
