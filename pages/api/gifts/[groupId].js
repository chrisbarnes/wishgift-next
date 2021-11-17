import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { faunaClient } from "../../../lib/fauna";

export default async function getGiftsByGroup(req, res) {
  const session = await getSession({ req });

  if (session && req.method === "GET") {
    const {
      query: { groupId },
    } = req;

    const query = await faunaClient.query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("gifts"))),
        q.Lambda((show) => q.Get(show))
      )
    );

    console.log(session);

    if (query && query.data && query.data.length) {
      const gifts = query.data.map((gift) => ({
        name: gift.data.name,
        description: gift.data.description,
        url: gift.data.url,
        isPurchased: gift.data.isPurchased,
        giftFor: {
          name: gift.data.giftFor.name,
        },
        owner: gift.data.owner,
        isOwner: gift.data.owner === session.email,
        id: gift.ref.id,
      }));

      res.status(200).json({ gifts });
    } else {
      res.status(404);
    }
  } else {
    res.status(401);
  }

  res.end();
}
