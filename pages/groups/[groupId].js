import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import useSWR from "swr";
import GroupHeader from "../../components/Groups/GroupHeader";
import GiftsList from "../../components/Gifts/GiftsList";
import { errorMessages } from "../../lib/constants";
import JoinGroup from "../../components/Groups/JoinGroup";

const fetcher = async (url) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

const GroupPage = (props) => {
  const { query } = useRouter();
  const endpoint = query.groupId ? `/api/groups/${query.groupId}` : "";
  const { data, error, mutate } = useSWR(endpoint, fetcher);

  if (
    error &&
    error.info &&
    error.info.message === errorMessages.unAuthorizedUser
  ) {
    return <JoinGroup update={mutate} />;
  }

  if (error) {
    return (
      <p>
        Sorry, you must be logged in to view groups.{" "}
        <button className="underline" onClick={() => signIn()}>
          Sign Up/Sign In
        </button>
      </p>
    );
  }

  if (!data) {
    <p>Loading...</p>;
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
        <GiftsList groupId={query.groupId} />
      </>
    );
  }

  return null;
};

export default GroupPage;
