import { useRouter } from "next/router";

const GroupPage = (props) => {
  const { query } = useRouter();

  return <div>hello from the {query.groupId} page</div>;
};

export default GroupPage;
