import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { faunaClient } from "../../../lib/fauna";

export default async function giftsApi(req, res) {
  const session = await getSession({ req });

  if (session && req.method === "GET") {
    // const query = await faunaClient.query(
    //   q.Map(
    //     q.Paginate(q.Documents(q.Collection("gifts"))),
    //     q.Lambda((show) => q.Get(show))
    //   )
    // );

    // if (query && query.data && query.data.length) {
    //   const gifts = query.data.map((gift) => ({
    //     name: gift.data.name,
    //     description: gift.data.description,
    //     url: gift.data.url,
    //     isPurchased: gift.data.isPurchased,
    //     giftFor: gift.data.giftFor,
    //     owner: gift.data.owner,
    //     id: gift.ref.id,
    //   }));

    //   res.status(200).json({ data: gifts });
    // } else {
    //   res.status(404);
    // }

    console.log(req.query);

    const gifts = [
      {
        name: "name",
        description: "description",
        url: "gift.data.url",
        isPurchased: "gift.data.isPurchased",
        giftFor: { name: "gift.data.giftFor" },
        owner: "gift.data.owner",
        id: "gift.ref.id",
      },
    ];

    res.status(200).json({ data: gifts });
  } else {
    res.status(401);
  }

  res.end();
}
