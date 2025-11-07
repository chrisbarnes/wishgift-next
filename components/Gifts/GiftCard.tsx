import { useSession } from "next-auth/react";
import { useState } from "react";
import AddImage from "./AddImage";
import GiftCardDelete from "./GiftCardDelete";
import GiftCardEdit from "./GiftCardEdit";
import GiftCardView from "./GiftCardView";

interface GiftCardProps {
  id: string;
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  isPurchased: boolean;
  purchasedBy: string;
  giftFor: {
    name: string;
  };
  price: string;
  owner: string;
  isOwner: boolean;
  bgColor: string;
  updated: () => void;
}

const GiftCard = (props: GiftCardProps) => {
  const { data: session, status } = useSession();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isAddingImage, setIsAddingImage] = useState<boolean>(false);

  const handleEditGiftToggle = (): void => {
    setIsEditing(!isEditing);
  };

  const handleDeleteGiftToggle = (): void => {
    setIsDeleting(!isDeleting);
  };

  const handleAddImageToggle = (): void => {
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
  const bgColor = isDisplayedAsPurchased ? props.bgColor : "bg-white dark:bg-gray-800";
  const height = isEditing ? "h-auto" : "h-64";
  const verticalRibbonClasses =
    "before:absolute before:top-0 before:right-20 before:w-9 before:h-full before:bg-white dark:before:bg-gray-800 before:shadow-lg before:border-r-2 before:border-l-2 before:border-gray-200 dark:before:border-gray-700";
  const horizontalRibbonClasses = `after:absolute after:top-40 after:left-0 after:w-full after:h-9 after:bg-white dark:after:bg-gray-800 after:shadow-sm after:border-t-2 after:border-b-2 after:border-gray-200 dark:after:border-gray-700`;
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
          updated={props.updated}
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
