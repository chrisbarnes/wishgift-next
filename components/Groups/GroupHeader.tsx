import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import TextInputControl from "../Forms/TextInputControl";
import { borderColors } from "../../lib/accentColors";
import { getRandomInt } from "../../lib/randomInt";
import { Button } from "@/components/ui/button";

interface GroupHeaderProps {
  name: string;
  description: string;
  isOwner: boolean;
  id: string;
  editedCallback?: () => void;
}

interface GroupEditFormData {
  name: string;
  description: string;
  groupId: string;
}

interface GroupEditResponse {
  data: {
    message: string;
  };
}

interface GroupDeleteResponse {
  data: {
    message: string;
  };
}

const GroupHeader = ({
  name,
  description,
  isOwner,
  id,
  editedCallback,
}: GroupHeaderProps) => {
  const router = useRouter();
  const randomColor = borderColors[getRandomInt(0, 5)];
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GroupEditFormData>();

  const submitData = async (
    data: GroupEditFormData,
  ): Promise<GroupEditResponse> => {
    setIsSubmitting(true);

    const response = await fetch("/api/groups/edit", {
      method: "PUT",
      body: JSON.stringify(data),
    });

    setIsSubmitting(false);

    return response.json();
  };

  const onSubmit = async (data: GroupEditFormData): Promise<void> => {
    submitData(data).then(({ data }) => {
      // If the form was submitted successfully toggle back to the card view
      if (data.message === "Success") {
        if (editedCallback) {
          editedCallback();
        }

        handleEditToggle();
      }
    });
  };

  const handleEditToggle = (): void => {
    setIsEditing(!isEditing);
  };

  const handleGroupDeleteToggle = (): void => {
    setIsEditing(false);
    setIsDeleting(!isDeleting);
  };

  const handleGroupDelete = async (): Promise<void> => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/groups/delete", {
        method: "DELETE",
        body: JSON.stringify({ groupId: id }),
      });

      const result: GroupDeleteResponse = await response.json();

      if (response.ok && result.data.message === "Success") {
        // Redirect to groups list page after successful deletion
        router.push("/groups");
      } else {
        console.error("Failed to delete group:", result);
        alert("Failed to delete group. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      alert("An error occurred while deleting the group.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGroupSave = (): void => {
    console.log("saving the group");
  };

  return (
    <div className={`pb-4 border-b-4 ${randomColor}`}>
      {isEditing && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container mx-auto flex flex-col md:flex-row items-start justify-between"
        >
          <div>
            <TextInputControl
              id="name"
              placeholder="Name"
              register={register}
              errors={errors}
              value={name}
              required
            />
            <TextInputControl
              id="description"
              placeholder="Description"
              register={register}
              errors={errors}
              value={description}
            />
          </div>

          <input type="hidden" {...register("groupId")} value={id} />

          <div className="mt-6 md:mt-0">
            <Button
              variant="outline"
              className="mr-3"
              onClick={handleEditToggle}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" onClick={handleGroupSave}>
              Save
            </Button>
          </div>
        </form>
      )}
      {!isEditing && (
        <div className="container mx-auto flex flex-col md:flex-row items-start justify-between">
          {!isEditing && (
            <div>
              <h4 className="mb-2 text-4xl font-extrabold leading-tight text-gray-700 dark:text-gray-200">
                {name}
              </h4>
              <p className="text-sm text-gray-900 dark:text-gray-100">{description}</p>
            </div>
          )}

          {isDeleting && (
            <div className="mt-6 md:mt-0">
              <span className="font-semibold text-lg text-gray-700 dark:text-gray-200 mr-3">
                Are you sure?
              </span>
              <Button
                variant="outline"
                className="mr-3"
                onClick={handleGroupDeleteToggle}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleGroupDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          )}
          {!isDeleting && !isEditing && (
            <div className="mt-6 md:mt-0">
              {isOwner && (
                <>
                  <Button
                    variant="destructive"
                    className="mr-3"
                    onClick={handleGroupDeleteToggle}
                    type="button"
                  >
                    Delete
                  </Button>
                  <Button onClick={handleEditToggle}>Edit</Button>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupHeader;
