import { unstable_getServerSession } from "next-auth/next";
import { supabase, getTableName } from "../../../../lib/supabase";
import { errorMessages } from "../../../../lib/constants";
import { authOptions } from "../../auth/[...nextauth]";

export default async function purchaseGift(req, res) {
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

    if (!data.giftId) {
      return res.status(400).json({ error: "Gift ID is required" });
    }

    // If the current user is a member of this group, allow them to update
    let isMember = false;

    // Query groups where the user is in the members array
    const { data: groups, error: groupsError } = await supabase
      .from(getTableName("groups"))
      .select("id")
      .contains("members", [email]);

    if (groupsError) {
      console.error("Error fetching groups:", groupsError);
      return res.status(500).json({ error: groupsError.message });
    }

    if (groups && groups.length) {
      const groupIds = groups.map((group) => group.id);

      if (groupIds.indexOf(data.groupId) > -1) {
        isMember = true;
      }
    }

    if (isMember) {
      const { data: updatedGift, error: updateError } = await supabase
        .from(getTableName("gifts"))
        .update({
          is_purchased: data.isPurchased,
          purchased_by: data.isPurchased ? email : null,
        })
        .eq("id", data.giftId)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating gift:", updateError);
        return res.status(500).json({ error: updateError.message });
      }

      return res
        .status(200)
        .json({ data: { data: updatedGift, message: "Success" } });
    } else {
      console.log(
        `Unauthorized user ${email} trying to mark purchased: ${data.giftId}.`,
      );

      // return unauthorized if the current user isn't a member of this group
      return res.status(401).json({ message: errorMessages.unAuthorizedUser });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
