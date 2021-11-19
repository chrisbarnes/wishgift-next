import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Button from "../Forms/Button";

const JoinGroup = () => {
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
    const response = await fetch("/api/groups/join", {
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
    <div className="px-6 py-4 shadow-md rounded-md mb-8">
      <h2 className="mb-4 font-bold text-lg">Join This Group</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          name="groupId"
          {...register("groupId")}
          value={query.groupId}
        />
        <Button type="submit">Join Group {isSubmitting && "..."}</Button>
      </form>
    </div>
  );
};

export default JoinGroup;
