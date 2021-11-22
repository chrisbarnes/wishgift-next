import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { faunaClient } from "../../../../lib/fauna";
import { errorMessages } from "../../../../lib/constants";

const isProd = process.env.IS_PROD;
const collection = isProd === "true" ? "gifts-prod" : "gifts";

export default async function editGift(req, res) {
  const session = await getSession({ req });
  const { user } = session;
  const { email } = user;

  if (session && req.method === "PUT") {
    try {
      const data = JSON.parse(req.body);

      if (data.giftId) {
        const giftQuery = await faunaClient.query(
          q.Get(q.Ref(q.Collection(collection), data.giftId))
        );

        if (giftQuery && giftQuery.data && giftQuery.data.owner === email) {
          const query = await faunaClient.query(
            q.Update(q.Ref(q.Collection(collection), data.giftId), {
              data: {
                name: data.name,
                description: data.description,
                url: data.url,
                price: data.price,
                owner: session.user.email,
                imageUrl: data.imageUrl,
                giftFor: {
                  name: data.giftFor ? data.giftFor : session.user.name,
                },
                groupId: data.groupId,
              },
            })
          );

          res.status(200).json({ data: { data: query, message: "Success" } });
        } else {
          console.log(`Unauthorized user ${email} trying to edit ${giftId}.`);

          // return unauthorized if the current user isn't the owner of this gift
          res.status(401).json({ message: errorMessages.unAuthorizedUser });
        }
      }
    } catch (error) {
      res.status(500);
    }
  } else {
    res.status(401);
  }

  res.end();
}
