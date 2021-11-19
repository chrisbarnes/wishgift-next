import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { faunaClient } from "../../../../lib/fauna";
import { errorMessages } from "../../../../lib/constants";

const isProd = process.env.IS_PROD;
const collection = isProd === "true" ? "gifts-prod" : "gifts";

export default async function deleteGift(req, res) {
  const session = await getSession({ req });
  const { user } = session;
  const { email } = user;

  if (session && req.method === "DELETE") {
    try {
      const { giftId } = JSON.parse(req.body);

      if (giftId) {
        // First, check to make sure the user can delete this gift
        const giftQuery = await faunaClient.query(
          q.Get(q.Ref(q.Collection(collection), giftId))
        );

        if (giftQuery && giftQuery.data && giftQuery.data.owner === email) {
          const query = await faunaClient.query(
            q.Delete(q.Ref(q.Collection(collection), giftId))
          );

          res.status(200).json({ data: { data: query, message: "Success" } });
        } else {
          console.log(`Unauthorized user ${email} trying to delete ${giftId}.`);

          // return unauthorized if the current user isn't the owner of this gift
          res.status(401).json({ message: errorMessages.unAuthorizedUser });
        }
      } else {
        res.status(204);
      }
    } catch (error) {
      console.log("error", error);
      res.status(500);
    }
  } else {
    res.status(401);
  }

  res.end();
}
