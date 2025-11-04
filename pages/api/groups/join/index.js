import { unstable_getServerSession } from "next-auth/next";
import { supabase, getTableName } from "../../../../lib/supabase";
import { authOptions } from "../../auth/[...nextauth]";

export default async function groupsApi(req, res) {
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
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { groupId } = body;

    if (!groupId) {
      return res.status(400).json({ error: "Group ID is required" });
    }

    // First, fetch the group
    const { data: group, error: fetchError } = await supabase
      .from(getTableName("groups"))
      .select("members")
      .eq("id", groupId)
      .single();

    if (fetchError) {
      console.error("Error fetching group:", fetchError);
      return res.status(500).json({ error: fetchError.message });
    }

    // Already in the group
    if (group && group.members && group.members.indexOf(email) > -1) {
      return res.status(200).json({ message: "Already a member" });
    } else {
      // Add user to members array
      const { data: updatedGroup, error: updateError } = await supabase
        .from(getTableName("groups"))
        .update({ members: [...group.members, email] })
        .eq("id", groupId)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating group:", updateError);
        return res.status(500).json({ error: updateError.message });
      }

      return res
        .status(200)
        .json({ data: { data: updatedGroup, message: "Success" } });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
