import { useRouter } from "next/router";
import GroupHeader from "../../components/Groups/GroupHeader";
import GiftsList from "../../components/Gifts/GiftsList";

const GroupPage = ({ groupName, groupDescription }) => {
  const { query } = useRouter();

  return (
    <>
      <GroupHeader name={groupName} description={groupDescription} />
      <GiftsList groupId={query.groupId} />
    </>
  );
};

export default GroupPage;
