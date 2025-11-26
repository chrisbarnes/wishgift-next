import { useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Edit2, Trash2, ShoppingBag, ExternalLink, Image } from "lucide-react";

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
  const { theme } = useTheme();
  const { query } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const isDarkMode = theme === "dark";

  const handleUpdatePurchased = async (checked: boolean): Promise<void> => {
    setIsSubmitting(true);
    const response = await fetch("/api/gifts/purchase", {
      method: "PUT",
      body: JSON.stringify({
        isPurchased: checked,
        giftId: id,
        groupId: query.groupId as string,
      }),
    });
    setIsSubmitting(false);
    const result = await response.json();
    if (result.data.message === "Success") {
      updated();
    }
  };

  return (
    <div
      className={`w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-800 to-slate-900"
          : "bg-gradient-to-br from-blue-50 to-purple-50"
      }`}
    >
      {/* Image Section */}
      <div className="relative h-56 overflow-hidden">
        {imageUrl ? (
          <div className="w-full h-full flex items-center justify-center">
            <img src={imageUrl} alt={name} className="max-w-full max-h-full" />
          </div>
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center ${
              isDarkMode
                ? "bg-gradient-to-br from-slate-700 to-slate-800"
                : "bg-gradient-to-br from-slate-200 to-slate-300"
            }`}
          >
            <ShoppingBag
              size={64}
              className={isDarkMode ? "text-slate-600" : "text-slate-400"}
            />
          </div>
        )}

        <div
          className={`absolute top-3 left-3 z-10 backdrop-blur-sm px-3 py-1.5 rounded-full ${
            isDarkMode ? "bg-slate-800/90" : "bg-white/90"
          }`}
        >
          <span
            className={`text-sm font-medium ${
              isDarkMode ? "text-slate-200" : "text-slate-700"
            }`}
          >
            For {giftFor.name}
          </span>
        </div>

        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`absolute top-3 right-3 z-10 backdrop-blur-sm p-2 rounded-full transition-colors ${
              isDarkMode
                ? "bg-slate-800/90 hover:bg-slate-700"
                : "bg-white/90 hover:bg-white"
            }`}
          >
            <ExternalLink
              size={16}
              className={isDarkMode ? "text-slate-200" : "text-slate-700"}
            />
          </a>
        )}

        {/* Actions Overlay - Visible on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 gap-2 pointer-events-none">
          {!isOwner && !isPurchased && (
            <label className="flex items-center gap-3 cursor-pointer bg-white/95 backdrop-blur-sm rounded-lg px-4 py-3 w-full pointer-events-auto">
              <input
                type="checkbox"
                checked={isPurchased}
                onChange={(e) => handleUpdatePurchased(e.target.checked)}
                disabled={isSubmitting}
                className="w-5 h-5 rounded border-2 border-green-600 text-green-600 focus:ring-2 focus:ring-green-500 cursor-pointer"
              />
              <span className="text-sm font-semibold text-slate-900">
                Mark as purchased by me
              </span>
            </label>
          )}

          {isOwner && (
            <div className="grid grid-cols-5 gap-2 pointer-events-auto">
              <button
                onClick={handleEditGiftClick}
                className="col-span-3 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all font-medium shadow-md"
              >
                <Edit2 size={16} />
                Edit
              </button>
              <button
                onClick={handleDeleteGiftClick}
                className="p-2.5 bg-white/95 hover:bg-red-100 text-slate-700 hover:text-red-600 rounded-lg transition-colors flex items-center justify-center backdrop-blur-sm"
              >
                <Trash2 size={16} />
              </button>
              <button
                onClick={handleAddImageClick}
                className="p-2.5 bg-white/95 hover:bg-blue-100 text-slate-700 hover:text-blue-600 rounded-lg transition-colors flex items-center justify-center backdrop-blur-sm"
              >
                <Image size={16} />
              </button>
            </div>
          )}
        </div>

        {isPurchased && (
          <div className="absolute inset-0 bg-gradient-to-t from-green-600 to-green-600/20 flex items-end p-4">
            <div className="bg-white px-3 py-2 rounded-lg flex items-center gap-2">
              <ShoppingBag size={16} className="text-green-600" />
              <span className="font-semibold text-slate-900">
                {purchasedBy}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className={isDarkMode ? "p-5 bg-slate-600" : "p-5 bg-white"}>
        <div className="mb-2">
          <h3
            className={`text-xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-slate-900"
            }`}
          >
            {name}
          </h3>
          {price && (
            <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-full font-bold">
              ${price}
            </div>
          )}
        </div>

        {description && (
          <p
            className={`text-sm line-clamp-2 ${
              isDarkMode ? "text-slate-400" : "text-slate-600"
            }`}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default GiftCardView;
