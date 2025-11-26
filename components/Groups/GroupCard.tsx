import Link from "next/link";

interface GroupCardProps {
  name: string;
  description: string;
  id: string;
}

const GroupCard = ({ name, description, id }: GroupCardProps) => {
  return (
    <div className="px-6 py-4 shadow-md rounded-md bg-white dark:bg-gray-800">
      <Link
        href={`/groups/${id}`}
        className="font-bold underline text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
      >
        {name}
      </Link>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </div>
  );
};

export default GroupCard;
