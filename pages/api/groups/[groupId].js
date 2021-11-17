import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { faunaClient } from "../../../lib/fauna";

export default async function getGroup(req, res) {
  const session = await getSession({ req });

  if (session && req.method === "GET") {
    const {
      query: { groupId },
    } = req;

    const query = await faunaClient.query(
      q.Get(q.Ref(q.Collection("groups"), groupId))
    );

    if (query && query.data) {
      const group = {
        name: query.data.name,
        description: query.data.description,
        id: query.ref.id,
      };

      res.status(200).json({ group });
    } else {
      res.status(404);
    }
  } else {
    res.status(401);
  }

  res.end();
}
