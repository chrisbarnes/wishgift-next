import { getSession } from "next-auth/react";
// import { query as q } from "faunadb";
// import { faunaClient } from "../../../lib/fauna";

export default async function getGiftsByGroup(req, res) {
  const session = await getSession({ req });

  if (session && req.method === "GET") {
    const {
      query: { groupId },
    } = req;

    // const query = await faunaClient.query(
    //   q.Map(
    //     q.Paginate(q.Documents(q.Collection("groups"))),
    //     q.Lambda((show) => q.Get(show))
    //   )
    // );

    // if (query && query.data && query.data.length) {
    //   const groups = query.data.map((group) => ({
    //     name: group.data.name,
    //     description: group.data.description,
    //     id: group.ref.id,
    //   }));

    //   res.status(200).json({ data: groups });
    // } else {
    //   res.status(404);
    // }
    const gifts = [
      {
        name: "name",
        description: "description",
        url: "gift.data.url",
        isPurchased: "gift.data.isPurchased",
        giftFor: { name: "gift.data.giftFor" },
        owner: "gift.data.owner",
        isOwner: true,
        id: "gift.ref.id",
      },
      {
        name: "Another gift with a longer name",
        description: "Description that could maybe be more than one line.",
        url: "gift.data.url",
        isPurchased: "gift.data.isPurchased",
        giftFor: { name: "gift.data.giftFor" },
        owner: "gift.data.owner",
        isOwner: false,
        id: "gift.ref.id",
      },
      {
        name: "name",
        description: "description",
        url: "gift.data.url",
        isPurchased: "gift.data.isPurchased",
        giftFor: { name: "gift.data.giftFor" },
        owner: "gift.data.owner",
        isOwner: false,
        id: "gift.ref.id",
      },
    ];

    res.status(200).json({ gifts });
  } else {
    res.status(401);
  }

  res.end();
}
