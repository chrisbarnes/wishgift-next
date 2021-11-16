import { getSession } from "next-auth/react";
import { query as q } from "faunadb";
import { faunaClient } from "../../../../lib/fauna";

export default async function createGroup(req, res) {
  const session = await getSession({ req });

  if (session && req.method === "PUT") {
    try {
      const data = JSON.parse(req.body);

      const query = await faunaClient.query(
        q.Create(q.Collection("groups"), {
          data: { name: data.name, description: data.description },
        })
      );

      res.status(200).json({ data: { data: query, message: "Success" } });
    } catch (error) {
      res.status(500);
    }
  } else {
    res.status(401);
  }

  res.end();
}