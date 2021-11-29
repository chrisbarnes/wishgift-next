import { useState } from "react";
import { useRouter } from "next/router";
import IconButton from "../Forms/IconButton";
import MarkPurchasedButton from "./MarkPurchasedButton";

const isGiftImageEnabled =
  process.env.NEXT_PUBLIC_IS_GIFT_IMAGE_ENABLED === "true";
const isEditBarTextEnabled =
  process.env.NEXT_PUBLIC_IS_GIFT_CONTROLS_V2_ENABLED === "true";

const GiftEditControls = ({
  isOwner,
  handleEditClick,
  handleDeleteClick,
  handleImageClick,
  isPurchased,
  purchasedBy,
  updated,
  giftId,
}) => {
  const { query } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitData = async (data) => {
    setIsSubmitting(true);
    const response = await fetch("/api/gifts/purchase", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    setIsSubmitting(false);
    return response.json();
  };
  const handleUpdatePurchased = async (event) => {
    const data = {
      isPurchased: event.target.checked,
      giftId,
      groupId: query.groupId,
    };
    submitData(data).then(({ data }) => {
      // If the form was submitted successfully, call the updated callback
      if (data.message === "Success") {
        updated();
      }
    });
  };
  const textColor = isPurchased ? "text-white" : "text-gray-700";
  const justify = isEditBarTextEnabled ? "justify-between" : "justify-evenly";

  return (
    <div className={`mt-auto flex flex-row ${justify} ${textColor}`}>
      {!isOwner && (
        <MarkPurchasedButton
          onChange={handleUpdatePurchased}
          isOwner={isOwner}
          isPurchased={isPurchased}
          purchasedBy={purchasedBy}
        />
      )}

      {isOwner && (
        <IconButton
          icon="Edit"
          clickHandler={handleEditClick}
          accessibleText="Edit this gift"
          displayText={isEditBarTextEnabled}
          text="Edit"
        />
      )}

      {isOwner && (
        <IconButton
          icon="Trash"
          clickHandler={handleDeleteClick}
          accessibleText="Delete this gift"
          displayText={isEditBarTextEnabled}
          text="Delete"
        />
      )}

      {isGiftImageEnabled && isOwner && (
        <IconButton
          icon="Photo"
          clickHandler={handleImageClick}
          accessibleText="Add an image to this gift"
          displayText={isEditBarTextEnabled}
          text="Add an image"
        />
      )}
    </div>
  );
};

export default GiftEditControls;
