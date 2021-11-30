import useSWR from "swr";
import { useCallback, useState, useEffect } from "react";
import GiftCard from "./GiftCard";
import CreateGift from "./CreateGift";
import GiftsCount from "./GiftsCount";
import SearchForm from "../Search/SearchForm";

const fetcher = (url) => fetch(url).then((res) => res.json());

const isGiftFilteringEnabled =
  process.env.NEXT_PUBLIC_IS_GIFT_FILTERING_ENABLED === "true";

const GiftsList = ({ groupId }) => {
  const { data, mutate, error } = useSWR(`/api/gifts/${groupId}`, fetcher);
  const [gifts, setGifts] = useState([]);

  if (error) {
    return <p>Sorry. There was an error retrieving the gifts.</p>;
  }

  // Set the gifts that come back from the api call in state
  // this way we can easily manipulate them with the search functionality
  useEffect(() => {
    if (data) {
      setGifts(data.gifts);
    }
  }, [data]);

  const searchGifts = (searchData) => {
    // Search inside of each gift for data inside of name, description, or for field
    const newGiftsToDisplay = data.gifts.filter((gift) => {
      return (
        gift.name.toLowerCase().indexOf(searchData.search) > -1 ||
        gift.description.toLowerCase().indexOf(searchData.search) > -1 ||
        gift.giftFor.name.toLowerCase().indexOf(searchData.search) > -1
      );
    });

    setGifts(newGiftsToDisplay);
  };

  const reset = () => {
    setGifts(data.gifts);
  };

  return (
    <>
      {isGiftFilteringEnabled && (
        <div className="mb-8 md:mb-4 flex flex-col-reverse md:flex-row justify-between items-center">
          {data && data.gifts && data.gifts.length && (
            <GiftsCount
              filteredGifts={gifts.length}
              totalGifts={data.gifts.length}
            />
          )}
          <SearchForm resetFilters={reset} searchCallback={searchGifts} />
        </div>
      )}
      <div className="md:grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <CreateGift updated={mutate} />
        {!data ? (
          <p>Loading gifts...</p>
        ) : (
          gifts &&
          gifts.length !== 0 &&
          gifts.map((gift) => (
            <GiftCard key={gift.id} {...gift} updated={mutate} />
          ))
        )}
      </div>
    </>
  );
};

export default GiftsList;
