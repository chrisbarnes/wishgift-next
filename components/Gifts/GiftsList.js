import useSWR from "swr";
import GiftCard from "./GiftCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

const GiftsList = ({ groupId }) => {
  const { data, giftsError } = useSWR(`/api/gifts/${groupId}`, fetcher);

  if (giftsError) {
    <p>Sorry. There was an error retrieving the gifts.</p>;
  }

  return (
    <div className="grid gap-4 grid-cols-3">
      {data &&
        data.gifts &&
        data.gifts.length &&
        data.gifts.map((gift) => <GiftCard key={gift.id} {...gift} />)}
    </div>
  );
};

export default GiftsList;
