import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Button from "../Forms/Button";

interface JoinGroupProps {
  update?: () => void;
}

interface JoinGroupFormData {
  groupId: string;
}

interface JoinGroupResponse {
  data: {
    message: string;
  };
}

const JoinGroup = ({ update }: JoinGroupProps) => {
  const { query } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<JoinGroupFormData>();

  const submitData = async (
    data: JoinGroupFormData
  ): Promise<JoinGroupResponse> => {
    setIsSubmitting(true);
    const response = await fetch("/api/groups/join", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    setIsSubmitting(false);
    return response.json();
  };

  const onSubmit = async (data: JoinGroupFormData): Promise<void> => {
    submitData(data).then(({ data }) => {
      // If the form was submitted successfully, reset it so we can submit another
      if (data.message === "Success" && update) {
        update();
      }
    });
  };

  return (
    <div className="px-6 py-4 shadow-md rounded-md mb-8 bg-white dark:bg-gray-800">
      <h2 className="mb-4 font-bold text-lg text-gray-900 dark:text-gray-100">
        Join This Group
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="hidden"
          {...register("groupId")}
          value={query.groupId as string}
        />
        <Button type="submit">Join Group {isSubmitting && "..."}</Button>
      </form>
    </div>
  );
};

export default JoinGroup;
