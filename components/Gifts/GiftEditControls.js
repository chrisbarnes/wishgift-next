import IconButton from "../Forms/IconButton";
import MarkPurchasedButton from "./MarkPurchasedButton";

const GiftEditControls = ({
  isOwner,
  handleEditClick,
  handleDeleteClick,
  isPurchased,
}) => {
  return (
    <div className="mt-auto flex flex-row justify-evenly">
      {!isOwner && (
        <MarkPurchasedButton isOwner={isOwner} isPurchased={isPurchased} />
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
