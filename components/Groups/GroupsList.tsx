import useSWR from "swr";
import GroupCard from "./GroupCard";

interface Group {
  id: string;
  name: string;
  description: string;
}

interface GroupsResponse {
  data: Group[];
}

const fetcher = (url: string): Promise<GroupsResponse> =>
  fetch(url).then((res) => res.json());

const GroupsList = () => {
  const { data: groupData, error } = useSWR<GroupsResponse>("/api/groups", fetcher);

  if (error) return <div className="text-gray-900 dark:text-gray-100">An error has occurred.</div>;
  if (!groupData) return <div className="text-gray-900 dark:text-gray-100">Loading...</div>; // todo create a better loading component here

  const { data: groups } = groupData;

  return (
    <div className="grid gap-4 grid-cols-3">
      {groups &&
        groups.length &&
        groups.map((group) => <GroupCard key={group.id} {...group} />)}
    </div>
  );
};

export default GroupsList;
