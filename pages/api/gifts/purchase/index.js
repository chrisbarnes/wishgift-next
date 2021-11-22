import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { faunaClient } from "../../../../lib/fauna";
import { errorMessages } from "../../../../lib/constants";

const isProd = process.env.IS_PROD;
const collection = isProd === "true" ? "gifts-prod" : "gifts";
const index = isProd === "true" ? "groups_by_member-prod" : "groups_by_member";

export default async function purchaseGift(req, res) {
  const session = await getSession({ req });

  if (session && req.method === "PUT") {
    const { user } = session;
    const { email } = user;

    try {
      const data = JSON.parse(req.body);

      if (data.giftId) {
        // If the current user is a member of this group, allow them to update
        let isMember = false;

        const query = await faunaClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index(index), email)),
            q.Lambda((show) => q.Get(show))
          )
        );

        if (query && query.data && query.data.length) {
          const groups = query.data.map((group) => {
            return group.ref.id;
          });

          if (groups.indexOf(data.groupId) > -1) {
            isMember = true;
          }
        }

        if (isMember) {
          const updatePurchaseQuery = await faunaClient.query(
            q.Update(q.Ref(q.Collection(collection), data.giftId), {
              data: {
                isPurchased: data.isPurchased,
                purchasedBy: data.isPurchased ? email : "",
              },
            })
          );

          res
            .status(200)
            .json({ data: { data: updatePurchaseQuery, message: "Success" } });
        } else {
          console.log(
            `Unauthorized user ${email} trying to mark purchased: ${giftId}.`
          );

          // return unauthorized if the current user isn't a member of this group
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
