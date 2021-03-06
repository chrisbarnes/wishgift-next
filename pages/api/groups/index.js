import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { faunaClient } from "../../../lib/fauna";

const isProd = process.env.IS_PROD;
const index = isProd === "true" ? "groups_by_member-prod" : "groups_by_member";

export default async function groupsApi(req, res) {
  const session = await getSession({ req });
  const { user } = session;
  const { email } = user;

  if (session && req.method === "GET") {
    const query = await faunaClient.query(
      q.Map(
        q.Paginate(q.Match(q.Index(index), email)),
        q.Lambda((show) => q.Get(show))
      )
    );

    if (query && query.data && query.data.length) {
      const groups = query.data.map((group) => ({
        name: group.data.name,
        description: group.data.description,
        id: group.ref.id,
      }));

      res.status(200).json({ data: groups });
    } else {
      res.status(404);
    }
  } else {
    res.status(401);
  }

  res.end();
}
