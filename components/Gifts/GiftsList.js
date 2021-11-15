import React from "react";
import GiftCard from "./GiftCard";

const GiftsList = ({ groupId }) => {
  const gifts = [
    {
      id: "test1",
      name: "gift 1",
      description: "some kind of description here",
      url: "http://www.google.com",
      isPurchased: false,
      owner: "barnes.chris@gmail.com",
      giftFor: {
        name: "chris",
      },
    },
    {
      id: "test2",
      name: "gift 2",
      url: "http://www.google.com",
      isPurchased: false,
      owner: "barnes.chris@gmail.com",
      giftFor: {
        name: "chris",
      },
    },
    {
      id: "test3",
      name: "gift 3",
      url: "http://www.google.com",
      isPurchased: false,
      owner: "barnes.chris@gmail.com",
      giftFor: {
        name: "chris",
      },
    },
  ];
  return (
    <div className="grid gap-4 grid-cols-3">
      {gifts.map((gift) => (
        <GiftCard key={gift.id} {...gift} />
      ))}
    </div>
  );
};

export default GiftsList;
