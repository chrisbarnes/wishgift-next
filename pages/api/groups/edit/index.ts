import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { supabase, getTableName } from "../../../../lib/supabase";
import { errorMessages } from "../../../../lib/constants";
import { authOptions } from "../../auth/[...nextauth]";

interface EditGroupRequest {
  groupId: string;
  name: string;
  description: string;
}

interface SuccessResponse {
  data: {
    data: any;
    message: string;
  };
}

interface ErrorResponse {
  error?: string;
  message?: string;
}

export default async function editGroup(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { user } = session;
  const { email } = user;

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data: EditGroupRequest =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

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
      const { data: updatedGroup, error: updateError } = await supabase
        .from(getTableName("groups"))
        .update({
          name: data.name,
          description: data.description,
        })
        .eq("id", data.groupId)
        .select()
        .single();

      if (updateError) {
        console.error("Error updating group:", updateError);
        return res.status(500).json({ error: updateError.message });
      }

      return res
        .status(200)
        .json({ data: { data: updatedGroup, message: "Success" } });
    } else {
      console.log(`Unauthorized user ${email} trying to edit ${data.groupId}.`);

      // return unauthorized if the current user isn't the owner of this gift
      return res.status(401).json({ message: errorMessages.unAuthorizedUser });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
