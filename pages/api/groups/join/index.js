import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { faunaClient } from "../../../../lib/fauna";

const isProd = process.env.IS_PROD;
const collection = isProd === "true" ? "groups-prod" : "groups";

export default async function groupsApi(req, res) {
  const session = await getSession({ req });
  const { user } = session;
  const { email } = user;

  if (session && req.method === "PUT") {
    try {
      const { groupId } = JSON.parse(req.body);

      if (groupId) {
        const groupQuery = await faunaClient.query(
          q.Get(q.Ref(q.Collection(collection), groupId))
        );

        // Already in the group
        if (
          groupQuery &&
          groupQuery.data &&
          groupQuery.data.members &&
          groupQuery.data.members.indexOf(email) > -1
        ) {
          res.status(204);
        } else {
          const query = await faunaClient.query(
            q.Update(q.Ref(q.Collection(collection), groupId), {
              data: { members: [...groupQuery.data.members, email] },
            })
          );

          res.status(200).json({ data: { data: query, message: "Success" } });
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
