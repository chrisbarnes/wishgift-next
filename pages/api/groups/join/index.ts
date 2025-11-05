import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { supabase, getTableName } from "../../../../lib/supabase";
import { authOptions } from "../../auth/[...nextauth]";

interface JoinGroupRequest {
  groupId: string;
}

interface Group {
  members: string[];
}

interface SuccessResponse {
  data?: {
    data: any;
    message: string;
  };
  message?: string;
}

interface ErrorResponse {
  error: string;
}

export default async function groupsApi(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>,
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { user } = session;
  const email = user?.email;

  if (!email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body: JoinGroupRequest =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;
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

    const groupData = group as Group;

    // Already in the group
    if (
      groupData &&
      groupData.members &&
      groupData.members.indexOf(email) > -1
    ) {
      return res.status(200).json({ message: "Already a member" });
    } else {
      // Add user to members array
      const { data: updatedGroup, error: updateError } = await supabase
        .from(getTableName("groups"))
        .update({ members: [...groupData.members, email] })
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
    return res.status(500).json({ error: (error as Error).message });
  }
}
