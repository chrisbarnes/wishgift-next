import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { supabase, getTableName } from "../../../../lib/supabase";
import { authOptions } from "../../auth/[...nextauth]";
import { autoFetchGiftImage } from "../../../../lib/autoFetchGiftImage";

interface CreateGiftRequest {
  name: string;
  description: string;
  url: string;
  price: string | null;
  giftFor?: string;
  groupId: string;
}

interface SuccessResponse {
  data: {
    data: any;
    message: string;
  };
}

interface ErrorResponse {
  error: string;
}

export default async function createGift(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user?.email || !session.user?.name) {
    console.log("createGift - No session found, returning 401");
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const data: CreateGiftRequest =
      typeof req.body === "string" ? JSON.parse(req.body) : req.body;

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

    // Trigger async image fetch if URL is provided (fire-and-forget)
    if (data.url && gift?.id) {
      autoFetchGiftImage(gift.id, data.url).catch((err) => {
        console.error(
          `Background image fetch failed for gift ${gift.id}:`,
          err
        );
      });
    }

    return res.status(200).json({ data: { data: gift, message: "Success" } });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
