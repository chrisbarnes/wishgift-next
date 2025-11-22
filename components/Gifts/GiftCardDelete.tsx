import { useState } from "react";
import { useForm } from "react-hook-form";

interface GiftCardDeleteProps {
  handleDeleteGiftToggle: () => void;
  giftId: string;
  deletedCallback: () => void;
  imageUrl: string;
  name: string;
}

interface DeleteGiftFormData {
  giftId: string;
}

interface DeleteGiftResponse {
  data: {
    message: string;
  };
}

const GiftCardDelete = ({
  handleDeleteGiftToggle,
  giftId,
  deletedCallback,
  imageUrl,
  name,
}: GiftCardDeleteProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const { register, handleSubmit, reset } = useForm<DeleteGiftFormData>();

  const submitData = async (
    data: DeleteGiftFormData,
  ): Promise<DeleteGiftResponse> => {
    setIsSubmitting(true);
    const response = await fetch("/api/gifts/delete", {
      method: "DELETE",
      body: JSON.stringify(data),
    });
    setIsSubmitting(false);
    setIsComplete(true);
    return response.json();
  };

  const onSubmit = async (data: DeleteGiftFormData): Promise<void> => {
    submitData(data).then(({ data }) => {
      // If the form was submitted successfully, reset it so we can submit another
      if (data.message === "Success") {
        reset({});

        if (deletedCallback) {
          deletedCallback();
        }
      }
    });
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative">
      {/* Image Section - Dimmed */}
      <div className="relative h-56 opacity-30">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center p-8">
        {isComplete ? (
          <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-8 w-full max-w-sm shadow-2xl">
            <p className="text-2xl font-bold text-white text-center">Deleted.</p>
          </div>
        ) : (
          <div className="bg-slate-800/95 backdrop-blur-sm rounded-2xl p-8 w-full max-w-sm shadow-2xl">
            <h3 className="text-2xl font-bold text-white text-center mb-6">
              Are you sure?
            </h3>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" {...register("giftId")} value={giftId} />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDeleteGiftToggle}
                  className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-xl font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors disabled:opacity-50"
                >
                  Delete {isSubmitting && "..."}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default GiftCardDelete;
