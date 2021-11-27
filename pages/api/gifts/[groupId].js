import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { faunaClient } from "../../../lib/fauna";

const isProd = process.env.IS_PROD;
const index = isProd === "true" ? "gifts_by_group-prod" : "gifts_by_group";

export default async function getGiftsByGroup(req, res) {
  const session = await getSession({ req });

  if (session && req.method === "GET") {
    const {
      query: { groupId },
    } = req;

    const query = await faunaClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index(index), groupId), { size: 128 }),
        q.Lambda((gift) => q.Get(gift))
      )
    );

    if (query && query.data && query.data.length) {
      const gifts = query.data.map((gift) => ({
        name: gift.data.name,
        description: gift.data.description,
        url: gift.data.url,
        isPurchased: gift.data.isPurchased,
        purchasedBy: gift.data.purchasedBy,
        imageUrl: gift.data.imageUrl,
        price: gift.data.price,
        giftFor: {
          name: gift.data.giftFor.name,
        },
        owner: gift.data.owner,
        isOwner: gift.data.owner === session.user.email,
        id: gift.ref.id,
      }));

      res.status(200).json({ gifts });
    } else {
      res.status(200).json({ gifts: [] });
    }
  } else {
    res.status(401);
  }

  res.end();
}
