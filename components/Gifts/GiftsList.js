import useSWR from "swr";
import { useState, useEffect } from "react";
import GiftCard from "./GiftCard";
import CreateGift from "./CreateGift";
import GiftsCount from "./GiftsCount";
import SearchForm from "../Search/SearchForm";
import { setBgColor } from "./utils";

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => ({ gifts: data.gifts.map(setBgColor) }));

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

  const parseSearchQuery = (query) => {
    // Check for field-specific search patterns like "for:value" or "name:value"
    // The (.+) ensures there's at least one character after the colon
    const fieldPattern = /^(for|name|description|url|price):(.+)$/i;
    const match = query.match(fieldPattern);

    if (match && match[2].trim().length > 0) {
      // Only use field-specific search if there's actually a value after the colon
      return {
        type: "field-specific",
        field: match[1].toLowerCase(),
        value: match[2].toLowerCase(),
      };
    }

    return {
      type: "general",
      value: query.toLowerCase(),
    };
  };

  const searchGifts = (searchData) => {
    const searchQuery = parseSearchQuery(searchData.search);

    const newGiftsToDisplay = data.gifts.filter((gift) => {
      if (searchQuery.type === "field-specific") {
        // Field-specific search
        switch (searchQuery.field) {
          case "for":
            return (
              gift.giftFor.name.toLowerCase().indexOf(searchQuery.value) > -1
            );
          case "name":
            return gift.name.toLowerCase().indexOf(searchQuery.value) > -1;
          case "description":
            return (
              gift.description.toLowerCase().indexOf(searchQuery.value) > -1
            );
          case "url":
            return gift.url.toLowerCase().indexOf(searchQuery.value) > -1;
          case "price":
            return (
              gift.price &&
              gift.price.toString().indexOf(searchQuery.value) > -1
            );
          default:
            return false;
        }
      } else {
        // General search across all fields
        return (
          gift.name.toLowerCase().indexOf(searchQuery.value) > -1 ||
          gift.description.toLowerCase().indexOf(searchQuery.value) > -1 ||
          gift.giftFor.name.toLowerCase().indexOf(searchQuery.value) > -1
        );
      }
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
          {data && data.gifts && data.gifts.length !== 0 && (
            <>
              <GiftsCount
                filteredGifts={gifts.length}
                totalGifts={data.gifts.length}
              />
              <SearchForm resetFilters={reset} searchCallback={searchGifts} />
            </>
          )}
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
