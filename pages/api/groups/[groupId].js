import { getSession } from "next-auth/react";
// import { query as q } from "faunadb";
// import { faunaClient } from "../../../lib/fauna";

export default async function getGroup(req, res) {
  const session = await getSession({ req });

  if (session && req.method === "GET") {
    const {
      query: { groupId },
    } = req;

    // const query = await faunaClient.query(
    //   q.Map(
    //     q.Paginate(q.Documents(q.Collection("groups"))),
    //     q.Lambda((show) => q.Get(show))
    //   )
    // );

    // if (query && query.data && query.data.length) {
    //   const groups = query.data.map((group) => ({
    //     name: group.data.name,
    //     description: group.data.description,
    //     id: group.ref.id,
    //   }));

    //   res.status(200).json({ data: groups });
    // } else {
    //   res.status(404);
    // }
    res.status(200).json({
      name: "test fake group name",
      description: "Test fake group description.",
    });
  } else {
    res.status(401);
  }

  res.end();
}
