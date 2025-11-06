import { useState } from "react";
import { useRouter } from "next/router";
import IconButton from "../Forms/IconButton";
import MarkPurchasedButton from "./MarkPurchasedButton";

const isGiftImageEnabled =
  process.env.NEXT_PUBLIC_IS_GIFT_IMAGE_ENABLED === "true";
const isEditBarTextEnabled =
  process.env.NEXT_PUBLIC_IS_GIFT_CONTROLS_V2_ENABLED === "true";

interface GiftEditControlsProps {
  isOwner: boolean;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
  handleImageClick: () => void;
  isPurchased: boolean;
  purchasedBy: string;
  updated: () => void;
  giftId: string;
}

interface UpdatePurchaseData {
  isPurchased: boolean;
  giftId: string;
  groupId: string | string[];
}

interface UpdatePurchaseResponse {
  data: {
    message: string;
  };
}

const GiftEditControls = ({
  isOwner,
  handleEditClick,
  handleDeleteClick,
  handleImageClick,
  isPurchased,
  purchasedBy,
  updated,
  giftId,
}: GiftEditControlsProps) => {
  const { query } = useRouter();
  const [_, setIsSubmitting] = useState<boolean>(false);

  const submitData = async (
    data: UpdatePurchaseData,
  ): Promise<UpdatePurchaseResponse> => {
    setIsSubmitting(true);
    const response = await fetch("/api/gifts/purchase", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    setIsSubmitting(false);
    return response.json();
  };

  const handleUpdatePurchased = async (checked: boolean): Promise<void> => {
    const data: UpdatePurchaseData = {
      isPurchased: checked,
      giftId,
      groupId: query.groupId as string,
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
