import { useRouter } from "next/router";
import useSWR from "swr";
import GroupHeader from "../../components/Groups/GroupHeader";
import GiftsList from "../../components/Gifts/GiftsList";
import CreateGift from "../../components/Gifts/CreateGift";

const fetcher = (url) => fetch(url).then((res) => res.json());

const GroupPage = (props) => {
  const { query } = useRouter();
  const { data: groupData, groupError } = useSWR(
    `/api/groups/${query.groupId}`,
    fetcher
  );

  if (groupError) {
    return <p>Sorry. There was an error retrieving this group.</p>;
  }

  if (groupData) {
    return (
      <>
        <GroupHeader
          name={groupData.name}
          description={groupData.description}
        />
        <CreateGift />
        <GiftsList groupId={query.groupId} />
      </>
    );
  }

  return <p>No group data yet.</p>;
};

export default GroupPage;
