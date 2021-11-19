import Link from "next/link";

const GroupCard = ({ name, description, id }) => {
  return (
    <div className="px-6 py-4 shadow-md rounded-md bg-white">
      <Link href={`/groups/${id}`}>
        <a className="font-bold underline">{name}</a>
      </Link>
      <p>{description}</p>
    </div>
  );
};

export default GroupCard;
