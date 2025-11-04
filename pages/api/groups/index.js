import { unstable_getServerSession } from "next-auth/next";
import { supabase, getTableName } from "../../../lib/supabase";
import { authOptions } from "../auth/[...nextauth]";

export default async function groupsApi(req, res) {
  console.log("getting session");
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { user } = session;
  const { email } = user;

  console.log("session", { user, email });
  console.log("request", req.method);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    console.log("getting groups for user");

    // Query groups where the user is in the members array
    const { data: groups, error } = await supabase
      .from(getTableName("groups"))
      .select("id, name, description")
      .contains("members", [email]);

    console.log("got groups", groups);

    if (error) {
      console.error("Error fetching groups:", error);
      return res.status(500).json({ error: error.message });
    }

    if (groups && groups.length > 0) {
      return res.status(200).json({ data: groups });
    } else {
      return res.status(200).json({ data: [] });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
