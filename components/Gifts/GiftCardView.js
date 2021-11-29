import GiftEditControls from "./GiftEditControls";
import Icons from "../Icons";

const GiftCardView = ({
  id,
  name,
  description,
  url,
  imageUrl,
  isPurchased,
  purchasedBy,
  giftFor,
  price,
  isOwner,
  handleEditGiftClick,
  handleDeleteGiftClick,
  handleAddImageClick,
  updated,
}) => {
  const textColor = isPurchased ? "text-white" : "text-gray-700";

  return (
    <div className="h-full flex flex-col justify-between">
      <div className="mb-7 pb-2 border-b-4">
        <div className="flex justify-between">
          <h3 className={`text-lg font-bold ${textColor}`}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener"
                className="flex flex-row items-start"
              >
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
            ) : (
              <>{name}</>
            )}
          </h3>
          {price && (
            <span className={`font-semibold ${textColor}`}>${price}</span>
          )}
        </div>
        {description && <p className={`text-sm ${textColor}`}>{description}</p>}
      </div>

      {!isPurchased && (
        <p className="relative">
          {imageUrl ? (
            <img className="w-20 h-auto" src={imageUrl} alt={name} />
          ) : (
            <Icons.Tag size="xxl" />
          )}
          <span className="absolute text-xs leading-none px-2 py-2 bg-white top-5 left-7 rounded-md shadow-md">
            {giftFor.name}
          </span>
        </p>
      )}

      <GiftEditControls
        isOwner={isOwner}
        handleEditClick={handleEditGiftClick}
        handleDeleteClick={handleDeleteGiftClick}
        handleImageClick={handleAddImageClick}
        giftId={id}
        isPurchased={isPurchased}
        purchasedBy={purchasedBy}
        updated={updated}
      />
    </div>
  );
};

export default GiftCardView;
