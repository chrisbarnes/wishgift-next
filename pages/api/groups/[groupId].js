import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { faunaClient } from "../../../lib/fauna";
import { errorMessages } from "../../../lib/constants";

const isProd = process.env.IS_PROD;
const collection = isProd === "true" ? "groups-prod" : "groups";

export default async function getGroup(req, res) {
  const session = await getSession({ req });
  const { user } = session;
  const { email } = user;

  if (session && req.method === "GET") {
    const {
      query: { groupId },
    } = req;

    const query = await faunaClient.query(
      q.Get(q.Ref(q.Collection(collection), groupId))
    );

    if (query && query.data) {
      if (
        !query.data.members ||
        (query.data.members &&
          query.data.members.length &&
          query.data.members.indexOf(email) === -1)
      ) {
        console.log(`Unauthorized user ${email} trying to access ${groupId}.`);

        // return unauthorized if the current user isn't in the list of members in the group
        res.status(401).json({ message: errorMessages.unAuthorizedUser });
      } else {
        const group = {
          name: query.data.name,
          description: query.data.description,
          id: query.ref.id,
        };

        res.status(200).json({ group });
      }
    } else {
      res.status(404);
    }
  } else {
    res.status(401);
  }

  res.end();
}
