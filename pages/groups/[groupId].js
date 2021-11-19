import { useRouter } from "next/router";
import useSWR from "swr";
import GroupHeader from "../../components/Groups/GroupHeader";
import GiftsList from "../../components/Gifts/GiftsList";
import CreateGift from "../../components/Gifts/CreateGift";
import { errorMessages } from "../../lib/constants";
import JoinGroup from "../../components/Groups/JoinGroup";
import Collapser from "../../components/Collapser/Collapser";

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

  if (!query.groupId) {
    return <p>Loading...</p>;
  }

  const { data, error } = useSWR(`/api/groups/${query.groupId}`, fetcher);

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
        <Collapser triggerText="Add Gift">
          <CreateGift />
        </Collapser>
        <GiftsList groupId={query.groupId} />
      </>
    );
  }

  return null;
};

export default GroupPage;
