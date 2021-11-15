import { useForm } from "react-hook-form";
import TextInputControl from "../Forms/TextInputControl";
import Button from "../Forms/Button";

const CreateGroup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const { data, error } = await fetch("/api/groups/create", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    if (error) return "An error has occurred.";
    if (!data) return "Loading..."; // todo create a better loading component here
  };

  return (
    <div className="px-6 py-4 shadow-md rounded-md mb-8">
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

        <Button type="submit">Create Group</Button>
      </form>
    </div>
  );
};

export default CreateGroup;
