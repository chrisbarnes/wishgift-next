import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { supabase, getTableName } from "../../../../lib/supabase";
import { errorMessages } from "../../../../lib/constants";
import { authOptions } from "../../auth/[...nextauth]";

interface DeleteGroupRequest {
  groupId: string;
}

interface SuccessResponse {
  data: {
    message: string;
  };
}

interface ErrorResponse {
  error?: string;
  message?: string;
}

export default async function deleteGroup(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { user } = session;
  const { email } = user;

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data: DeleteGroupRequest = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    if (!data.groupId) {
      return res.status(400).json({ error: "Group ID is required" });
    }

    // First, check if the user is the owner
    const { data: group, error: fetchError } = await supabase
      .from(getTableName("groups"))
      .select("owner")
      .eq("id", data.groupId)
      .single();

    if (fetchError) {
      console.error("Error fetching group:", fetchError);
      return res.status(500).json({ error: fetchError.message });
    }

    if (group && group.owner === email) {
      // Delete the group
      const { error: deleteError } = await supabase
        .from(getTableName("groups"))
        .delete()
        .eq("id", data.groupId);

      if (deleteError) {
        console.error("Error deleting group:", deleteError);
        return res.status(500).json({ error: deleteError.message });
      }

      return res
        .status(200)
        .json({ data: { message: "Success" } });
    } else {
      console.log(`Unauthorized user ${email} trying to delete ${data.groupId}.`);

      // return unauthorized if the current user isn't the owner of this group
      return res.status(401).json({ message: errorMessages.unAuthorizedUser });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
