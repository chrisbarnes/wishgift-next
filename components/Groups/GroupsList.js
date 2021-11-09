import Link from "next/link";

const GroupsList = () => {
  const groups = [
    {
      id: "group1",
      name: "Group 1",
    },
    {
      id: "group2",
      name: "Group 2",
    },
    {
      id: "group3",
      name: "Group 3",
    },
  ];
  return (
    <ul>
      {groups.map((group) => (
        <li key={group.id}>
          <Link href={`/groups/${group.id}`}>{group.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default GroupsList;
