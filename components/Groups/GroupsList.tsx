import { useQuery } from "@tanstack/react-query";
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
  const { data: groupData, error, isLoading } = useQuery<GroupsResponse>({
    queryKey: ["groups"],
    queryFn: () => fetcher("/api/groups"),
  });

  if (error) return "An error has occurred.";
  if (isLoading || !groupData) return "Loading..."; // todo create a better loading component here

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
