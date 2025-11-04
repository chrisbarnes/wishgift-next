import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { faunaClient } from "../../../../lib/fauna";
import { errorMessages } from "../../../../lib/constants";

const isProd = process.env.IS_PROD;
const collection = isProd === "true" ? "groups-prod" : "groups";

export default async function editGroup(req, res) {
  const session = await getSession({ req });
  const { user } = session;
  const { email } = user;

  if (session && req.method === "PUT") {
    try {
      const data = JSON.parse(req.body);

      if (data.groupId) {
        const groupQuery = await faunaClient.query(
          q.Get(q.Ref(q.Collection(collection), data.groupId))
        );

        if (groupQuery && groupQuery.data && groupQuery.data.owner === email) {
          const query = await faunaClient.query(
            q.Update(q.Ref(q.Collection(collection), data.groupId), {
              data: {
                name: data.name,
                description: data.description,
                groupId: data.groupId,
              },
            })
          );

          res.status(200).json({ data: { data: query, message: "Success" } });
        } else {
          console.log(
            `Unauthorized user ${email} trying to edit ${data.groupId}.`
          );

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
