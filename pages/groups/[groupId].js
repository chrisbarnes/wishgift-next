import { useRouter } from "next/router";
import useSWR from "swr";
import GroupHeader from "../../components/Groups/GroupHeader";
import GiftsList from "../../components/Gifts/GiftsList";
import CreateGift from "../../components/Gifts/CreateGift";

const fetcher = (url) => fetch(url).then((res) => res.json());

const GroupPage = (props) => {
  const { query } = useRouter();
  const { data, error } = useSWR(`/api/groups/${query.groupId}`, fetcher);

  if (error) {
    return <p>Sorry. There was an error retrieving this group.</p>;
  }

  if (data) {
    return (
      <>
        <GroupHeader
          name={data.group.name}
          description={data.group.description}
        />
        <CreateGift />
        <GiftsList groupId={query.groupId} />
      </>
    );
  }

  return <p>Loading...</p>;
};

export default GroupPage;
