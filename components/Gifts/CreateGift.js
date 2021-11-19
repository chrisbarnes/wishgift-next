import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import TextInputControl from "../Forms/TextInputControl";
import Button from "../Forms/Button";

const CreateGift = () => {
  const { query } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
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
      // If the form was submitted successfully, reset it so we can submit another
      if (data.message === "Success") {
        reset({});
      }
    });
  };

  return (
    <div className="px-6 py-4 shadow-md rounded-md mb-8 bg-white">
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
          required
        />
        <TextInputControl
          id="url"
          label="Url"
          register={register}
          errors={errors}
        />
        <TextInputControl
          id="giftFor"
          label="For"
          register={register}
          errors={errors}
        />

        <input
          type="hidden"
          name="groupId"
          {...register("groupId")}
          value={query.groupId}
        />

        <Button type="submit">Submit {isSubmitting && "..."}</Button>
      </form>
    </div>
  );
};

export default CreateGift;
