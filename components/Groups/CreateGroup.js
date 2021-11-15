import { useForm } from "react-hook-form";

const CreateGroup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <div className="px-6 py-4 shadow-md rounded-md">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Name</label>
        <input {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}

        <label htmlFor="description">Description</label>
        <input {...register("description", { required: true })} />
        {errors.name && <span>This field is required</span>}

        <input type="submit" />
      </form>
    </div>
  );
};

export default CreateGroup;
