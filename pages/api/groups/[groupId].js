import { unstable_getServerSession } from "next-auth/next";
import { supabase, getTableName } from "../../../lib/supabase";
import { errorMessages } from "../../../lib/constants";
import { authOptions } from "../auth/[...nextauth]";

export default async function getGroup(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { user } = session;
  const { email } = user;

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      query: { groupId },
    } = req;

    const { data: group, error } = await supabase
      .from(getTableName("groups"))
      .select("id, name, description, owner, members")
      .eq("id", groupId)
      .single();

    if (error) {
      console.error("Error fetching group:", error);
      return res.status(404).json({ error: "Group not found" });
    }

    if (group) {
      if (
        !group.members ||
        (group.members && group.members.indexOf(email) === -1)
      ) {
        console.log(`Unauthorized user ${email} trying to access ${groupId}.`);

        // return unauthorized if the current user isn't in the list of members in the group
        return res
          .status(401)
          .json({ message: errorMessages.unAuthorizedUser });
      } else {
        const groupData = {
          name: group.name,
          description: group.description,
          id: group.id,
          isOwner: group.owner === email,
        };

        return res.status(200).json({ group: groupData });
      }
    } else {
      return res.status(404).json({ error: "Group not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
