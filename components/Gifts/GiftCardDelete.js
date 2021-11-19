import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../Forms/Button";

const GiftCardDelete = ({
  handleDeleteGiftToggle,
  giftId,
  deletedCallback,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const submitData = async (data) => {
    setIsSubmitting(true);
    const response = await fetch("/api/gifts/delete", {
      method: "DELETE",
      body: JSON.stringify(data),
    });
    setIsSubmitting(false);
    setIsComplete(true);
    return response.json();
  };
  const onSubmit = async (data) => {
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
    <div className="">
      {isComplete ? (
        <p className="text-center font-bold text-lg">Deleted.</p>
      ) : (
        <>
          <p className="mb-8 text-center font-bold text-lg">Are you sure?</p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-2 flex flex-row justify-evenly"
          >
            <input
              type="hidden"
              name="groupId"
              {...register("giftId")}
              value={giftId}
            />
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
