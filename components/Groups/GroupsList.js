import useSWR from "swr";
import GroupCard from "./GroupCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

const GroupsList = () => {
  const { data: groups, error } = useSWR("/api/groups", fetcher);

  if (error) return "An error has occurred.";
  if (!groups) return "Loading..."; // todo create a better loading component here

  return (
    <div className="grid gap-4 grid-cols-3">
      {groups &&
        groups.length &&
        groups.map((group) => <GroupCard key={group.id} {...group} />)}
    </div>
  );
};

export default GroupsList;
