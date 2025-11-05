import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Forms/Button";

interface GiftCardDeleteProps {
  handleDeleteGiftToggle: () => void;
  giftId: string;
  deletedCallback: () => void;
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
}: GiftCardDeleteProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<DeleteGiftFormData>();

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
    <div className="h-full flex flex-col justify-center">
      {isComplete ? (
        <p className="text-center font-bold text-lg">Deleted.</p>
      ) : (
        <>
          <p className="mb-8 text-center font-bold text-lg">Are you sure?</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-2 flex flex-row justify-evenly"
          >
            <input type="hidden" {...register("giftId")} value={giftId} />
            <Button type="button" onClick={handleDeleteGiftToggle}>
              Cancel
            </Button>
            <Button type="submit">Delete {isSubmitting && "..."}</Button>
          </form>
        </>
      )}
    </div>
  );
};

export default GiftCardDelete;
