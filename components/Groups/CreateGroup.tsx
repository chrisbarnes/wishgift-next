import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import TextInputControl from "../Forms/TextInputControl";
import Button from "../Forms/Button";

interface CreateGroupFormData {
  name: string;
  description: string;
}

interface CreateGroupResponse {
  data?: {
    message: string;
  };
  error?: string;
}

const CreateGroup = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const queryClient = useQueryClient();
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
    try {
      const response = await fetch("/api/groups/create", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      return { error: (error as Error).message };
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (formData: CreateGroupFormData): Promise<void> => {
    setSubmitError(null);
    const { data, error } = await submitData(formData);
    // If the form was submitted successfully, reset it so we can submit another
    if (data?.message === "Success") {
      reset({});
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    } else {
      setSubmitError(error || "Something went wrong creating the group.");
    }
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

        {submitError && (
          <p role="alert" className="mb-4 text-red-600 dark:text-red-400">
            {submitError}
          </p>
        )}
        <Button type="submit">Submit {isSubmitting && "..."}</Button>
      </form>
    </div>
  );
};

export default CreateGroup;
