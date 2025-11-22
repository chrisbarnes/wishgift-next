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

  return (
    <div className="mb-4 md:mb-0">
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
          imageUrl={props.imageUrl}
          name={props.name}
        />
      )}
    </div>
  );
};

export default GiftCard;
