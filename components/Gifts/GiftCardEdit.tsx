import { useState } from "react";

interface GiftCardEditProps {
  handleEditGiftToggle: () => void;
  gift: {
    id: string;
    name: string;
    description: string;
    url: string;
    imageUrl: string;
    giftFor: {
      name: string;
    };
    price: string;
  };
  editedCallback: () => void;
}

interface EditGiftFormData {
  name: string;
  description: string;
  url: string;
  giftFor: string;
  price: string;
}

interface EditGiftResponse {
  data?: {
    message: string;
  };
  error?: string;
}

const GiftCardEdit = ({
  handleEditGiftToggle,
  gift,
  editedCallback,
}: GiftCardEditProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [editFormData, setEditFormData] = useState<EditGiftFormData>({
    name: gift.name,
    description: gift.description,
    url: gift.url,
    giftFor: gift.giftFor.name,
    price: gift.price,
  });

  const submitData = async (): Promise<EditGiftResponse> => {
    setIsSubmitting(true);
    const response = await fetch("/api/gifts/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify({
        ...editFormData,
        giftId: gift.id,
      }),
    });
    setIsSubmitting(false);
    return response.json();
  };

  const handleSaveChanges = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!editFormData.name.trim()) {
      alert("Gift name is required");
      return;
    }

    submitData()
      .then((response) => {
        // If the form was submitted successfully toggle back to the card view
        if (response.data && response.data.message === "Success") {
          if (editedCallback) {
            editedCallback();
          }

          handleEditGiftToggle();
        } else if (response.error) {
          console.error("Error editing gift:", response.error);
          alert("Error editing gift: " + response.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error editing gift");
      });
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-md relative">
      {/* Image Section - Dimmed */}
      <div className="relative h-56 opacity-20">
        <img
          src={gift.imageUrl}
          alt={gift.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-start justify-center p-3 overflow-y-auto">
        <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-4 w-full max-w-full shadow-2xl my-auto">
          <h3 className="text-lg font-bold text-white mb-3">
            Edit Gift
          </h3>

          <form onSubmit={handleSaveChanges} className="space-y-3">
            {/* Gift Name */}
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Gift Name *
              </label>
              <input
                type="text"
                value={editFormData.name}
                onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Keyboard Wrist Rest"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Price
              </label>
              <input
                type="text"
                value={editFormData.price}
                onChange={(e) => setEditFormData({...editFormData, price: e.target.value})}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="$22"
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Product URL
              </label>
              <input
                type="text"
                value={editFormData.url}
                onChange={(e) => setEditFormData({...editFormData, url: e.target.value})}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://..."
              />
            </div>

            {/* Gift For */}
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Gift For
              </label>
              <input
                type="text"
                value={editFormData.giftFor}
                onChange={(e) => setEditFormData({...editFormData, giftFor: e.target.value})}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Sarah"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium text-white mb-1">
                Description
              </label>
              <textarea
                value={editFormData.description}
                onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Add a description..."
              />
            </div>

            <div className="flex gap-2 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-sm rounded-lg font-semibold transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={handleEditGiftToggle}
                className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GiftCardEdit;
