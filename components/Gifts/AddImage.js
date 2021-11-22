import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../Forms/Button";

const AddImage = ({ url, handleAddImageToggle }) => {
  const [isSubmitting, setIsSubmitting] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const submitData = async (data) => {
    setIsSubmitting(true);
    const response = await fetch(`/api/images/find?url=${url}`);
    setIsSubmitting(false);
    return response.json();
  };
  const onSubmit = async (data) => {
    submitData(data).then(({ data }) => {
      if (data.message === "Success") {
        reset({});
        // updated();
      }
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="hidden" name="url" {...register("url")} value={url} />
        <Button type="submit">Find {isSubmitting && "..."}</Button>
        <Button onClick={handleAddImageToggle}>Cancel</Button>
      </form>
    </div>
  );
};

export default AddImage;
