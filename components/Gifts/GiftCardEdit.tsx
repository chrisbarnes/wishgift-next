import { useForm } from "react-hook-form";
import { useState } from "react";
import TextInputControl from "../Forms/TextInputControl";
import Button from "../Forms/Button";

interface GiftCardEditProps {
  handleEditGiftToggle: () => void;
  gift: {
    id: string;
    name: string;
    description: string;
    url: string;
    giftFor: {
      name: string;
    };
    price: string;
  };
  editedCallback: () => void;
}

interface EditGiftFormData {
  name: string;
  description?: string;
  url?: string;
  giftFor?: string;
  price?: string;
  giftId: string;
}

interface EditGiftResponse {
  data?: {
    message: string;
  };
  error?: string;
}

const GiftCardEdit = ({
  handleEditGiftToggle,
  gift,
  editedCallback,
}: GiftCardEditProps) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditGiftFormData>();

  const submitData = async (
    data: EditGiftFormData,
  ): Promise<EditGiftResponse> => {
    setIsSubmitting(true);
    const response = await fetch("/api/gifts/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(data),
    });
    setIsSubmitting(false);
    return response.json();
  };

  const onSubmit = async (data: EditGiftFormData): Promise<void> => {
    submitData(data)
      .then((response) => {
        // If the form was submitted successfully toggle back to the card view
        if (response.data && response.data.message === "Success") {
          if (editedCallback) {
            editedCallback();
          }

          handleEditGiftToggle();
        } else if (response.error) {
          console.error("Error editing gift:", response.error);
          alert("Error editing gift: " + response.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error editing gift");
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInputControl
          id="name"
          label="Name"
          register={register}
          errors={errors}
          value={gift.name}
          required
        />
        <TextInputControl
          id="description"
          label="Description"
          register={register}
          errors={errors}
          value={gift.description}
        />
        <TextInputControl
          id="url"
          label="URL"
          register={register}
          errors={errors}
          value={gift.url}
        />
        <TextInputControl
          id="giftFor"
          label="For (if not for you)"
          register={register}
          errors={errors}
          value={gift.giftFor.name}
        />
        <TextInputControl
          id="price"
          label="Price ($)"
          register={register}
          errors={errors}
          value={gift.price}
        />
        <input type="hidden" {...register("giftId")} value={gift.id} />
        <div className="mt-4 flex justify-evenly">
          <Button type="submit">Submit {isSubmitting && "..."}</Button>
          <Button type="button" onClick={handleEditGiftToggle}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GiftCardEdit;
