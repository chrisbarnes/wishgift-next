import { useSession } from "next-auth/react";
import { useState } from "react";
import AddImage from "./AddImage";
import GiftCardDelete from "./GiftCardDelete";
import GiftCardEdit from "./GiftCardEdit";
import GiftCardView from "./GiftCardView";

const GiftCard = (props) => {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isAddingImage, setIsAddingImage] = useState(false);
  const handleEditGiftToggle = () => {
    setIsEditing(!isEditing);
  };
  const handleDeleteGiftToggle = () => {
    setIsDeleting(!isDeleting);
  };
  const handleAddImageToggle = () => {
    setIsAddingImage(!isAddingImage);
  };
  const iAmOwner =
    status !== "loading" &&
    session &&
    session.user &&
    session.user.email === props.owner;

  const isDisplayedAsPurchased = !iAmOwner && props.isPurchased;

  // if this is not my gift and it is purchased by someone else, then
  // I should not see the purchase option and it should look different
  const bgColor = isDisplayedAsPurchased ? "bg-gray-700" : "bg-white";
  const height = isEditing ? "h-auto" : "h-64";
  const verticalRibbonClasses =
    "before:absolute before:top-0 before:right-20 before:w-9 before:h-full before:bg-white before:shadow-lg before:border-r-2 before:border-l-2 before:border-gray-200";
  const horizontalRibbonClasses = `after:absolute after:top-40 after:left-0 after:w-full after:h-9 after:bg-white after:shadow-sm after:border-t-2 after:border-b-2 after:border-gray-200`;
  const isPurchasedClasses = isDisplayedAsPurchased
    ? `${verticalRibbonClasses} ${horizontalRibbonClasses}`
    : "after:-top-40 before:-right-20";

  return (
    <div
      className={`overflow-hidden relative mb-4 md:mb-0 px-4 pt-4 pb-2 shadow-md rounded-md flex flex-col ${bgColor} shadow after:transition-all before:transition-all transition-colors ${height} ${isPurchasedClasses}`}
    >
      {!isEditing && !isDeleting && !isAddingImage && (
        <GiftCardView
          {...props}
          isPurchased={isDisplayedAsPurchased} // override the isPurchased to obscure purchased from gift owner
          handleEditGiftClick={handleEditGiftToggle}
          handleDeleteGiftClick={handleDeleteGiftToggle}
          handleAddImageClick={handleAddImageToggle}
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
      {isAddingImage && (
        <AddImage
          url={props.url}
          giftId={props.id}
          handleAddImageToggle={handleAddImageToggle}
          addedCallback={props.updated}
        />
      )}
    </div>
  );
};

export default GiftCard;
