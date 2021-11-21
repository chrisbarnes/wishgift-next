import useSWR from "swr";
import GiftCard from "./GiftCard";
import CreateGift from "./CreateGift";

const fetcher = (url) => fetch(url).then((res) => res.json());

const GiftsList = ({ groupId }) => {
  const { data, mutate, error } = useSWR(`/api/gifts/${groupId}`, fetcher);

  if (error) {
    <p>Sorry. There was an error retrieving the gifts.</p>;
  }

  return (
    <div className="md:grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <CreateGift updated={mutate} />
      {data &&
        data.gifts &&
        data.gifts.length !== 0 &&
        data.gifts.map((gift) => (
          <GiftCard key={gift.id} {...gift} updated={mutate} />
        ))}
    </div>
  );
};

export default GiftsList;
