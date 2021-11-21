import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import TextInputControl from "../Forms/TextInputControl";
import Button from "../Forms/Button";

const CreateGift = ({ updated }) => {
  const { query } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const submitData = async (data) => {
    setIsSubmitting(true);
    const response = await fetch("/api/gifts/create", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    setIsSubmitting(false);
    return response.json();
  };
  const onSubmit = async (data) => {
    submitData(data).then(({ data }) => {
      // If the form was submitted successfully, reset it so we can submit another and then
      // call the updated callback
      if (data.message === "Success") {
        reset({});
        updated();
      }
    });
  };

  const cardStyle = !isEditing ? { maxHeight: "204px" } : {};

  return (
    <div
      className="mb-4 md:mb-0 px-6 py-4 shadow-md rounded-md bg-white"
      style={cardStyle}
    >
      {!isEditing ? (
        <div className="text-center h-full flex flex-col justify-center">
          <button
            className="p-8 lg:p-12 text-4xl xl:text-6xl font-thin uppercase"
            onClick={() => setIsEditing(true)}
            title="Add a Gift"
          >
            + Gift
          </button>
        </div>
      ) : (
        <>
          <h2 className="mb-4 font-bold text-lg">Add a Gift</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInputControl
              id="name"
              label="Name"
              register={register}
              errors={errors}
              required
            />
            <TextInputControl
              id="description"
              label="Description"
              register={register}
              errors={errors}
            />
            <TextInputControl
              id="url"
              label="Url"
              register={register}
              errors={errors}
            />
            <TextInputControl
              id="giftFor"
              label="For (if not for you)"
              register={register}
              errors={errors}
            />
            <TextInputControl
              id="price"
              label="Price ($)"
              register={register}
              errors={errors}
            />

            <input
              type="hidden"
              name="groupId"
              {...register("groupId")}
              value={query.groupId}
            />

            <div className="mt-4 flex justify-evenly">
              <Button type="submit">Submit {isSubmitting && "..."}</Button>
              <Button type="button" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateGift;
