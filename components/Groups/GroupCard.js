import Link from "next/link";

const GroupCard = ({ name, description, id }) => {
  return (
    <div className="px-6 py-4 shadow-md rounded-md bg-white">
      <Link href={`/groups/${id}`} className="font-bold underline">
        {name}
      </Link>
      <p>{description}</p>
    </div>
  );
};

export default GroupCard;
