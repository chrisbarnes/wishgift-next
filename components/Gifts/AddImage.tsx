import { useState } from "react";
import ImageSelector from "./ImageSelector";

interface AddImageProps {
  url: string;
  handleAddImageToggle: () => void;
  giftId: string;
  addedCallback: () => void;
  imageUrl: string;
  name: string;
}

interface ImageSearchResponse {
  data: {
    images?: string[];
  };
}

const AddImage = ({
  url,
  handleAddImageToggle,
  giftId,
  addedCallback,
  imageUrl,
  name,
}: AddImageProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isChoosingImages, setIsChoosingImages] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>(url);

  const submitData = async (
    searchUrl: string,
  ): Promise<ImageSearchResponse> => {
    setIsSubmitting(true);
    const response = await fetch(`/api/images/find?url=${searchUrl}`);
    setIsSubmitting(false);
    return response.json();
  };

  const onSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    submitData(urlInput).then(({ data }) => {
      if (data.images && data.images.length) {
        setImages(data.images);
        setIsChoosingImages(true);
      }
    });
  };

  return (
    <div>
      {isChoosingImages ? (
        <ImageSelector
          images={images}
          handleAddImageToggle={handleAddImageToggle}
          giftId={giftId}
          addedCallback={addedCallback}
        />
      ) : (
        <div className="relative w-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-md">
          {/* Image Section - Dimmed */}
          <div className="relative h-56 opacity-20">
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Overlay Content */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-6 w-full shadow-2xl">
              <form onSubmit={onSubmit}>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-400 mb-3">
                    Enter a URL to search for images
                  </h3>

                  <label className="block text-sm font-medium text-white mb-2">
                    URL
                  </label>
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="https://www.amazon.com/Extra-Strength-Zinc..."
                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-xl font-semibold transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "Finding..." : "Find"}
                  </button>
                  <button
                    type="button"
                    onClick={handleAddImageToggle}
                    className="flex-1 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddImage;
