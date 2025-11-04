import { unstable_getServerSession } from "next-auth/next";
import { supabase, getTableName } from "../../../../lib/supabase";
import { authOptions } from "../../auth/[...nextauth]";

export default async function createGroup(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { user } = session;
  const { email } = user;

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { data: group, error } = await supabase
      .from(getTableName("groups"))
      .insert({
        name: data.name,
        description: data.description,
        members: [email],
        owner: email,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating group:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ data: { data: group, message: "Success" } });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
