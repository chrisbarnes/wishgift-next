import Icons from "../Icons";
import MarkPurchasedButton from "./MarkPurchasedButton";

const GiftEditControls = ({ isOwner }) => {
  return (
    <div className="mt-6 flex flex-row justify-evenly">
      {!isOwner && <MarkPurchasedButton isOwner={isOwner} />}

      {isOwner && (
        <button className="p-4 w-5 h-5">
          <Icons.Edit />
        </button>
      )}

      {isOwner && (
        <button className="p-4 w-5 h-5">
          <Icons.Trash />
        </button>
      )}
    </div>
  );
};

export default GiftEditControls;
