import { useState } from "react";
import { useRouter } from "next/router";
import Button from "../Forms/Button";

interface ImageSelectorProps {
  images: string[];
  handleAddImageToggle: () => void;
  giftId: string;
  addedCallback: () => void;
}

interface SaveImageData {
  imageUrl: string;
  giftId: string;
  groupId: string | string[];
}

interface SaveImageResponse {
  data: {
    message: string;
  };
}

const ImageSelector = ({
  images,
  handleAddImageToggle,
  giftId,
  addedCallback,
}: ImageSelectorProps) => {
  const [selectedImage, setSelectedImage] = useState<string | undefined>();
  const [selectedImageIndex, setSelectedImageIndex] = useState<
    number | undefined
  >();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const { query } = useRouter();

  if (!images) {
    return null;
  }

  const handleImageSelect = (imageUrl: string, index: number): void => {
    setSelectedImage(imageUrl);
    setSelectedImageIndex(index);
  };

  const submitData = async (
    data: SaveImageData,
  ): Promise<SaveImageResponse> => {
    setIsSubmitting(true);
    const response = await fetch("/api/gifts/edit", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    setIsSubmitting(false);
    return response.json();
  };

  const handleImageSave = async (): Promise<void> => {
    if (selectedImage) {
      setHasError(false);
      const data: SaveImageData = {
        imageUrl: selectedImage,
        giftId,
        groupId: query.groupId as string,
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

      <div className="flex justify-around mt-4">
        <Button onClick={handleAddImageToggle}>Cancel</Button>
        <Button onClick={handleImageSave}>Save {isSubmitting && "..."}</Button>
      </div>
      {hasError && <p>Please select an image first.</p>}
    </>
  );
};

export default ImageSelector;
