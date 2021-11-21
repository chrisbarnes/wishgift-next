import { useState } from "react";
import { useRouter } from "next/router";
import IconButton from "../Forms/IconButton";
import MarkPurchasedButton from "./MarkPurchasedButton";

const GiftEditControls = ({
  isOwner,
  handleEditClick,
  handleDeleteClick,
  isPurchased,
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

  return (
    <div className={`mt-auto flex flex-row justify-evenly ${textColor}`}>
      {!isOwner && (
        <MarkPurchasedButton
          onChange={handleUpdatePurchased}
          isOwner={isOwner}
          isPurchased={isPurchased}
        />
      )}

      {isOwner && (
        <IconButton
          icon="Edit"
          clickHandler={handleEditClick}
          accessibleText="Edit this gift"
        />
      )}

      {isOwner && (
        <IconButton
          icon="Trash"
          clickHandler={handleDeleteClick}
          accessibleText="Delete this gift"
        />
      )}
    </div>
  );
};

export default GiftEditControls;
