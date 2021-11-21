import { useSession } from "next-auth/react";
import { useState } from "react";
import GiftCardDelete from "./GiftCardDelete";
import GiftCardEdit from "./GiftCardEdit";
import GiftCardView from "./GiftCardView";

const GiftCard = (props) => {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleEditGiftToggle = () => {
    setIsEditing(!isEditing);
  };
  const handleDeleteGiftToggle = () => {
    setIsDeleting(!isDeleting);
  };
  const cardStyle = !isEditing ? { maxHeight: "204px" } : {};

  const iAmOwner =
    status !== "loading" &&
    session &&
    session.user &&
    session.user.email === props.owner;

  console.log("session", session);
  console.log("props.owner", props.owner);
  console.log("iAmOwner", iAmOwner);

  const isDisplayedAsPurchased = !iAmOwner && props.isPurchased;

  // if this is not my gift and it is purchased by someone else, then
  // I should not see the purchase option and it should look different
  const bgColor = isDisplayedAsPurchased ? "bg-gray-700" : "bg-white";

  return (
    <div
      className={`mb-4 md:mb-0 px-6 py-4 shadow-md rounded-md flex flex-col ${bgColor} transition-colors`}
      style={cardStyle}
    >
      {!isEditing && !isDeleting && (
        <GiftCardView
          {...props}
          isPurchased={isDisplayedAsPurchased} // override the isPurchased to obscure purchased from gift owner
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
