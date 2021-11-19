import { useRouter } from "next/router";
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
  const { data, error } = useSWR(endpoint, fetcher);

  if (
    error &&
    error.info &&
    error.info.message === errorMessages.unAuthorizedUser
  ) {
    return <JoinGroup />;
  }

  if (error) {
    return <p>Sorry. There was an error retrieving this group.</p>;
  }

  if (!data) {
    <p>Loading...</p>;
  } else {
    return (
      <>
        <GroupHeader
          name={data.group.name}
          description={data.group.description}
        />
        <GiftsList groupId={query.groupId} />
      </>
    );
  }

  return null;
};

export default GroupPage;
