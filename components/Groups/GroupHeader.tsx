import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import TextInputControl from "../Forms/TextInputControl";
import { borderColors } from "../../lib/accentColors";
import { getRandomInt } from "../../lib/randomInt";

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
            <button
              className="mr-3 bg-gray-200 dark:bg-gray-700 focus:outline-none transition duration-150 ease-in-out rounded hover:bg-gray-300 text-blue-700 dark:hover:bg-gray-600 dark:text-blue-600 px-5 py-2 text-sm"
              onClick={handleEditToggle}
              type="button"
            >
              Cancel
            </button>
            {/* <button
              className="mr-3 bg-red-500 dark:bg-red-700 focus:outline-none transition duration-150 ease-in-out rounded hover:bg-red-700 text-white dark:hover:bg-gray-600 dark:text-gray-200 px-5 py-2 text-sm"
              onClick={handleGroupDeleteToggle}
              type="button"
            >
              Delete
            </button> */}
            <button
              className="transition focus:outline-none duration-150 ease-in-out hover:bg-blue-600 bg-blue-700 rounded text-white px-8 py-2 text-sm"
              onClick={handleGroupSave}
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      )}
      {!isEditing && (
        <div className="container mx-auto flex flex-col md:flex-row items-start justify-between">
          {!isEditing && (
            <div>
              <h4 className="mb-2 text-4xl font-extrabold leading-tight text-gray-700">
                {name}
              </h4>
              <p className="text-sm text-black">{description}</p>
            </div>
          )}

          {isDeleting && (
            <div className="mt-6 md:mt-0">
              <span className="font-semibold text-lg text-gray-700 mr-3">
                Are you sure?
              </span>
              <button
                className="mr-3 bg-gray-200 dark:bg-gray-700 focus:outline-none transition duration-150 ease-in-out rounded hover:bg-gray-300 text-blue-700 dark:hover:bg-gray-600 dark:text-blue-600 px-5 py-2 text-sm"
                onClick={handleGroupDeleteToggle}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 dark:bg-red-700 focus:outline-none transition duration-150 ease-in-out rounded hover:bg-red-700 text-white dark:hover:bg-gray-600 dark:text-gray-200 px-5 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleGroupDelete}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
          {!isDeleting && !isEditing && (
            <div className="mt-6 md:mt-0">
              {isOwner && (
                <>
                  <button
                    className="mr-3 bg-red-500 dark:bg-red-700 focus:outline-none transition duration-150 ease-in-out rounded hover:bg-red-700 text-white dark:hover:bg-red-800 dark:text-gray-200 px-5 py-2 text-sm"
                    onClick={handleGroupDeleteToggle}
                    type="button"
                  >
                    Delete
                  </button>
                  <button
                    className="transition focus:outline-none duration-150 ease-in-out hover:bg-blue-600 bg-blue-700 rounded text-white px-8 py-2 text-sm"
                    onClick={handleEditToggle}
                  >
                    Edit
                  </button>
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
