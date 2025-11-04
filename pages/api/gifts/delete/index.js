import { unstable_getServerSession } from "next-auth/next";
import { supabase } from "../../../../lib/supabase";
import { errorMessages } from "../../../../lib/constants";
import { authOptions } from "../../auth/[...nextauth]";

export default async function deleteGift(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { user } = session;
  const { email } = user;

  if (req.method !== "DELETE") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
    const { giftId } = body;

    if (!giftId) {
      return res.status(400).json({ error: "Gift ID is required" });
    }

    // First, check to make sure the user can delete this gift
    const { data: gift, error: fetchError } = await supabase
      .from("gifts")
      .select("owner")
      .eq("id", giftId)
      .single();

    if (fetchError) {
      console.error("Error fetching gift:", fetchError);
      return res.status(500).json({ error: fetchError.message });
    }

    if (gift && gift.owner === email) {
      const { error: deleteError } = await supabase
        .from("gifts")
        .delete()
        .eq("id", giftId);

      if (deleteError) {
        console.error("Error deleting gift:", deleteError);
        return res.status(500).json({ error: deleteError.message });
      }

      return res.status(200).json({ data: { message: "Success" } });
    } else {
      console.log(`Unauthorized user ${email} trying to delete ${giftId}.`);

      // return unauthorized if the current user isn't the owner of this gift
      return res.status(401).json({ message: errorMessages.unAuthorizedUser });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error.message });
  }
}
