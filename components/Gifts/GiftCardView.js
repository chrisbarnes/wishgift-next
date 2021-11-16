import GiftEditControls from "./GiftEditControls";

const GiftCardView = ({
  id,
  name,
  description,
  url,
  isPurchased,
  giftFor,
  owner,
  isOwner,
  handleEditGiftClick,
  handleDeleteGiftClick,
}) => {
  return (
    <>
      <div className="mb-7 pb-2 border-b-4">
        <h3 className="text-lg text-gray-700 font-bold">
          <a href={url} target="_blank" className="flex flex-row items-center">
            {name}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 inline-block ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
            </svg>
          </a>
        </h3>
        {description && <p className="text-sm">{description}</p>}
      </div>

      <p>For: {giftFor.name}</p>
      <p>Purchased? {isPurchased ? "Yes" : "No"}</p>
      <GiftEditControls
        isOwner={isOwner}
        handleEditClick={handleEditGiftClick}
        handleDeleteClick={handleDeleteGiftClick}
      />
    </>
  );
};

export default GiftCardView;
