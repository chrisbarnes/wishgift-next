import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import GroupHeader from "../../components/Groups/GroupHeader";
import GiftsList from "../../components/Gifts/GiftsList";
import { errorMessages } from "../../lib/constants";
import JoinGroup from "../../components/Groups/JoinGroup";
import type { NextPage } from "next";

interface FetchError extends Error {
  info?: {
    message?: string;
  };
  status?: number;
}

interface GroupData {
  group: {
    id: string;
    name: string;
    description: string;
    isOwner: boolean;
  };
}

const fetcher = async (url: string): Promise<GroupData> => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error(
      "An error occurred while fetching the data.",
    ) as FetchError;
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const GroupPage: NextPage = () => {
  const { query } = useRouter();
  const endpoint = query.groupId ? `/api/groups/${query.groupId}` : "";
  const { data, error, refetch } = useQuery<GroupData, FetchError>({
    queryKey: ["group", query.groupId],
    queryFn: () => fetcher(endpoint),
    enabled: !!endpoint,
  });

  // Create a refetch function that can be passed to child components
  const mutate = useCallback(() => {
    refetch();
  }, [refetch]);

  if (
    error &&
    error.info &&
    error.info.message === errorMessages.unAuthorizedUser
  ) {
    return <JoinGroup update={mutate} />;
  }

  if (error) {
    return (
      <p className="text-gray-900 dark:text-gray-100">
        Sorry, you must be logged in to view groups.{" "}
        <button className="underline hover:text-blue-600 dark:hover:text-blue-400" onClick={() => signIn()}>
          Sign Up/Sign In
        </button>
      </p>
    );
  }

  if (!data) {
    <p className="text-gray-900 dark:text-gray-100">Loading...</p>;
  } else {
    return (
      <>
        <GroupHeader
          name={data.group.name}
          description={data.group.description}
          isOwner={data.group.isOwner}
          id={data.group.id}
          editedCallback={mutate}
        />
        <GiftsList
          groupId={query.groupId as string}
          initialSearch={query.s as string | undefined}
        />
      </>
    );
  }

  return null;
};

export default GroupPage;
