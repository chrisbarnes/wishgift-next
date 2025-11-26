import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import TextInputControl from "../Forms/TextInputControl";
import Button from "../Forms/Button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface CreateGiftProps {
  updated: () => void;
}

interface CreateGiftFormData {
  name: string;
  description?: string;
  url?: string;
  giftFor?: string;
  price?: string;
  groupId: string;
}

interface CreateGiftResponse {
  data?: {
    message: string;
  };
  error?: string;
}

const CreateGift = ({ updated }: CreateGiftProps) => {
  const { query } = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateGiftFormData>();

  const submitData = async (
    data: CreateGiftFormData,
  ): Promise<CreateGiftResponse> => {
    setIsSubmitting(true);
    const response = await fetch("/api/gifts/create", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin", // Important: include cookies
      body: JSON.stringify(data),
    });
    setIsSubmitting(false);
    return response.json();
  };

  const onSubmit = async (data: CreateGiftFormData): Promise<void> => {
    submitData(data)
      .then((response) => {
        // If the form was submitted successfully, reset it so we can submit another and then
        // call the updated callback
        if (response.data && response.data.message === "Success") {
          reset({});
          updated();
          setIsOpen(false); // Close the drawer on success
        } else if (response.error) {
          console.error("Error creating gift:", response.error);
          alert("Error creating gift: " + response.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error creating gift");
      });
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <div className="mb-4 md:mb-0 px-6 py-4 shadow-md rounded-md bg-white dark:bg-gray-800 h-full">
          <div className="text-center h-full flex flex-col justify-center">
            <button
              className="p-8 lg:p-12 text-4xl xl:text-6xl font-thin uppercase"
              title="Add a Gift"
            >
              + Gift
            </button>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-md">
          <DrawerHeader>
            <DrawerTitle>Add a Gift</DrawerTitle>
            <DrawerDescription>
              Add a new gift to this group. Fill in the details below.
            </DrawerDescription>
          </DrawerHeader>

          {isSubmitting ? (
            <div className="text-center py-8">
              <p className="text-lg">Adding gift...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="px-4">
              <div className="grid grid-cols-2 gap-4">
                <TextInputControl
                  id="name"
                  label="Name"
                  register={register}
                  errors={errors}
                  required
                />
                <TextInputControl
                  id="price"
                  label="Price ($)"
                  register={register}
                  errors={errors}
                />
                <TextInputControl
                  id="url"
                  label="URL"
                  register={register}
                  errors={errors}
                />
                <TextInputControl
                  id="giftFor"
                  label="For (if not for you)"
                  register={register}
                  errors={errors}
                />
                <div className="col-span-2">
                  <TextInputControl
                    id="description"
                    label="Description"
                    register={register}
                    errors={errors}
                  />
                </div>
              </div>

              <input
                type="hidden"
                {...register("groupId")}
                value={query.groupId as string}
              />

              <DrawerFooter>
                <Button type="submit" disabled={isSubmitting}>
                  Submit
                </Button>
                <DrawerClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateGift;
