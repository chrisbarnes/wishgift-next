import GiftEditControls from "./GiftEditControls";
import Icons from "../Icons";

interface GiftCardViewProps {
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
  isOwner: boolean;
  handleEditGiftClick: () => void;
  handleDeleteGiftClick: () => void;
  handleAddImageClick: () => void;
  updated: () => void;
}

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
}: GiftCardViewProps) => {
  const textColor = isPurchased ? "text-white" : "text-gray-700 dark:text-gray-200";
  const nameTagClasses = isPurchased
    ? "absolute text-gray-700 bottom-14 right-14 z-10 bg-white px-6 py-4 border-2 border-gray-200 uppercase text-xs font-semibold shadow-sm rounded-sm"
    : "relative";

  return (
    <div className="h-full flex flex-col justify-between">
      <div className={` pb-2 ${isPurchased ? "" : "mb-7 border-b-4"}`}>
        <div className="flex justify-between">
          <h3
            className={`text-lg ${
              isPurchased ? "leading-tight font-thin" : "font-bold"
            } ${textColor} ${isPurchased ? "w-40" : ""}`}
          >
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener"
                className="flex flex-row items-start"
              >
                {name}
                {!isPurchased && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 inline-block ml-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                )}
              </a>
            ) : (
              <>{name}</>
            )}
          </h3>
          {price && !isPurchased && (
            <span className={`font-semibold ${textColor}`}>${price}</span>
          )}
        </div>
        {description && !isPurchased && (
          <p className={`text-sm ${textColor}`}>{description}</p>
        )}
      </div>

      <p className={`transition-all ${nameTagClasses}`}>
        {imageUrl && !isPurchased && (
          <img className="w-20 h-auto" src={imageUrl} alt={name} />
        )}
        {!imageUrl && !isPurchased && <Icons.Tag size="xxl" />}
        {!isPurchased && (
          <span className="absolute text-xs leading-none px-2 py-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 top-5 left-7 rounded-md shadow-md">
            {giftFor.name}
          </span>
        )}
        {isPurchased && <span>{giftFor.name}</span>}
      </p>

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
