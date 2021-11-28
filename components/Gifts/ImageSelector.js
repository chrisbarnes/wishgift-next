import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../Forms/Button";

const ImageSelector = ({
  images,
  handleAddImageToggle,
  giftId,
  addedCallback,
}) => {
  const [selectedImage, setSelectedImage] = useState();
  const [selectedImageIndex, setSelectedImageIndex] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { query } = useRouter();

  if (!images) {
    return null;
  }

  const handleImageSelect = (imageUrl, index) => {
    setSelectedImage(imageUrl);
    setSelectedImageIndex(index);
  };

  const submitData = async (data) => {
    setIsSubmitting(true);
    const response = await fetch("/api/gifts/edit", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    setIsSubmitting(false);
    return response.json();
  };

  const handleImageSave = async () => {
    if (selectedImage) {
      setHasError(false);
      const data = {
        imageUrl: selectedImage,
        giftId,
        groupId: query.groupId,
      };
      submitData(data).then(({ data }) => {
        // If the form was submitted successfully, call the updated callback
        if (data.message === "Success") {
          addedCallback();
          handleAddImageToggle();
        }
      });
    } else {
      setHasError(true);
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-1">
        {images.length &&
          images.map((image, index) => {
            const selectedClass =
              selectedImageIndex === index
                ? "border-opacity-1"
                : "border-opacity-0";

            return (
              <button
                className={`border-4 border-blue-700 transition-colors ${selectedClass}`}
                onClick={() => handleImageSelect(image, index)}
                key={"image-selector-" + index}
              >
                <img src={image} className="max-w-10 h-auto max-h-10 mx-auto" />
              </button>
            );
          })}
      </div>

      <Button onClick={handleAddImageToggle}>Cancel</Button>
      <Button onClick={handleImageSave}>Save {isSubmitting && "..."}</Button>
      {hasError && <p>Please select an image first.</p>}
    </>
  );
};

export default ImageSelector;
