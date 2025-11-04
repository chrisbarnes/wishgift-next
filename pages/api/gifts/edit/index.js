import { unstable_getServerSession } from "next-auth/next";
import { supabase, getTableName } from "../../../../lib/supabase";
import { errorMessages } from "../../../../lib/constants";
import { authOptions } from "../../auth/[...nextauth]";

export default async function editGift(req, res) {
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

    // First, check if the user is the owner
    const { data: gift, error: fetchError } = await supabase
      .from(getTableName("gifts"))
      .select("owner")
      .eq("id", data.giftId)
      .single();

    if (fetchError) {
      console.error("Error fetching gift:", fetchError);
      return res.status(500).json({ error: fetchError.message });
    }

    if (gift && gift.owner === email) {
      const { data: updatedGift, error: updateError } = await supabase
        .from(getTableName("gifts"))
        .update({
          name: data.name,
          description: data.description,
          url: data.url,
          price: data.price,
          owner: session.user.email,
          image_url: data.imageUrl,
          gift_for_name: data.giftFor ? data.giftFor : session.user.name,
          group_id: data.groupId,
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
      console.log(`Unauthorized user ${email} trying to edit ${data.giftId}.`);

      // return unauthorized if the current user isn't the owner of this gift
      return res.status(401).json({ message: errorMessages.unAuthorizedUser });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
