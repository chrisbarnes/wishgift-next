import { useForm } from "react-hook-form";
import { useState } from "react";
import Button from "../Forms/Button";
import TextInputControl from "../Forms/TextInputControl";
import ImageSelector from "./ImageSelector";

const AddImage = ({ url, handleAddImageToggle, giftId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isChoosingImages, setIsChoosingImages] = useState(false);
  const [images, setImages] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const submitData = async (data) => {
    setIsSubmitting(true);
    const response = await fetch(`/api/images/find?url=${data.url}`);
    setIsSubmitting(false);
    return response.json();
  };
  const onSubmit = async (data) => {
    submitData(data).then(({ data }) => {
      if (data.images && data.images.length) {
        setImages(data.images);
        setIsChoosingImages(true);
      }
    });
  };

  return (
    <div>
      {isChoosingImages ? (
        <ImageSelector
          images={images}
          handleAddImageToggle={handleAddImageToggle}
          giftId={giftId}
        />
      ) : (
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            Enter a URL to search for images
          </h3>
          <div className="mb-8">
            <TextInputControl
              id="url"
              label="URL"
              register={register}
              errors={errors}
              value={url}
              required
            />
          </div>
          <div className="flex justify-around">
            <Button type="submit">Find {isSubmitting && "..."}</Button>
            <Button onClick={handleAddImageToggle}>Cancel</Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddImage;
