import { useState } from "react";
import { useForm } from "react-hook-form";
import TextInputControl from "../Forms/TextInputControl";
import Button from "../Forms/Button";

interface CreateGroupFormData {
  name: string;
  description: string;
}

interface CreateGroupResponse {
  data: {
    message: string;
  };
}

const CreateGroup = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateGroupFormData>();

  const submitData = async (
    data: CreateGroupFormData
  ): Promise<CreateGroupResponse> => {
    setIsSubmitting(true);
    const response = await fetch("/api/groups/create", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    setIsSubmitting(false);
    return response.json();
  };

  const onSubmit = async (data: CreateGroupFormData): Promise<void> => {
    submitData(data).then(({ data }) => {
      // If the form was submitted successfully, reset it so we can submit another
      if (data.message === "Success") {
        reset({});
      }
    });
  };

  return (
    <div className="px-6 py-4 shadow-md rounded-md mb-8 bg-white dark:bg-gray-800">
      <h2 className="mb-4 font-bold text-lg text-gray-900 dark:text-gray-100">
        Create a Group
      </h2>
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

        <Button type="submit">Submit {isSubmitting && "..."}</Button>
      </form>
    </div>
  );
};

export default CreateGroup;
