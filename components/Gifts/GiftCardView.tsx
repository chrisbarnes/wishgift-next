import { Edit2, Trash2, ShoppingBag, ExternalLink } from "lucide-react";
import GiftEditControls from "./GiftEditControls";

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
  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image Section */}
      <div className="relative h-56">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
            <ShoppingBag size={64} className="text-slate-400 dark:text-slate-600" />
          </div>
        )}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-sm font-medium text-slate-700">For {giftFor.name}</span>
        </div>
        {isPurchased && (
          <div className="absolute inset-0 bg-gradient-to-t from-green-600 to-green-600/20 flex items-end p-4">
            <div className="bg-white px-3 py-2 rounded-lg flex items-center gap-2">
              <ShoppingBag size={16} className="text-green-600" />
              <span className="font-semibold text-slate-900">{purchasedBy}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 bg-white dark:bg-slate-800">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1 flex items-center gap-2">
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {name}
                <ExternalLink size={16} />
              </a>
            ) : (
              name
            )}
          </h3>
          {price && (
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-full font-bold">
              ${price}
            </div>
          )}
        </div>

        {description && (
          <p className="text-slate-600 dark:text-slate-300 text-sm mb-4">
            {description}
          </p>
        )}

        {/* Actions */}
        {isOwner ? (
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={handleEditGiftClick}
              className="col-span-2 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all font-medium shadow-md"
            >
              <Edit2 size={16} />
              Edit Gift
            </button>
            <button
              onClick={handleDeleteGiftClick}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg transition-colors flex items-center justify-center"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default GiftCardView;
