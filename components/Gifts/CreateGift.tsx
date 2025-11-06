import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import TextInputControl from "../Forms/TextInputControl";
import Button from "../Forms/Button";

interface CreateGiftProps {
  updated: () => void;
}

interface CreateGiftFormData {
  name: string;
  description?: string;
  url?: string;
  giftFor?: string;
  price?: string;
  groupId: string;
}

interface CreateGiftResponse {
  data?: {
    message: string;
  };
  error?: string;
}

const CreateGift = ({ updated }: CreateGiftProps) => {
  const { query } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateGiftFormData>();

  const submitData = async (
    data: CreateGiftFormData,
  ): Promise<CreateGiftResponse> => {
    setIsSubmitting(true);
    const response = await fetch("/api/gifts/create", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin", // Important: include cookies
      body: JSON.stringify(data),
    });
    setIsSubmitting(false);
    return response.json();
  };

  const onSubmit = async (data: CreateGiftFormData): Promise<void> => {
    submitData(data)
      .then((response) => {
        // If the form was submitted successfully, reset it so we can submit another and then
        // call the updated callback
        if (response.data && response.data.message === "Success") {
          reset({});
          updated();
        } else if (response.error) {
          console.error("Error creating gift:", response.error);
          alert("Error creating gift: " + response.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error creating gift");
      });
  };

  const height = isEditing ? "h-auto" : "h-64";

  return (
    <div
      className={`mb-4 md:mb-0 px-6 py-4 shadow-md rounded-md bg-white ${height}`}
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
      ) : isSubmitting ? (
        <div className="text-center h-full flex flex-col justify-center">
          <p className="text-lg">Adding gift...</p>
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
              label="URL"
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
              {...register("groupId")}
              value={query.groupId as string}
            />

            <div className="mt-4 flex justify-evenly">
              <Button type="submit">Submit</Button>
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
