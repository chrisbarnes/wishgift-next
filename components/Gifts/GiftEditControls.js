import IconButton from "../Forms/IconButton";
import MarkPurchasedButton from "./MarkPurchasedButton";

const GiftEditControls = ({ isOwner, handleEditClick, handleDeleteClick }) => {
  return (
    <div className="mt-6 flex flex-row justify-evenly">
      {!isOwner && <MarkPurchasedButton isOwner={isOwner} />}

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
