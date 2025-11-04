import { unstable_getServerSession } from "next-auth/next";
import { supabase, getTableName } from "../../../../lib/supabase";
import { authOptions } from "../../auth/[...nextauth]";

export default async function createGift(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session) {
    console.log("createGift - No session found, returning 401");
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

    const { data: gift, error } = await supabase
      .from(getTableName("gifts"))
      .insert({
        name: data.name,
        description: data.description,
        url: data.url,
        price: data.price,
        is_purchased: false,
        owner: session.user.email,
        gift_for_name: data.giftFor ? data.giftFor : session.user.name,
        group_id: data.groupId,
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating gift:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ data: { data: gift, message: "Success" } });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: error.message });
  }
}
