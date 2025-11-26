import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { supabase, getTableName } from "../../../lib/supabase";
import { authOptions } from "../auth/[...nextauth]";

interface Gift {
  id: string;
  name: string;
  description: string;
  url: string;
  is_purchased: boolean;
  purchased_by: string | null;
  image_url: string | null;
  price: string | null;
  gift_for_name: string;
  owner: string;
}

interface FormattedGift {
  name: string;
  description: string;
  url: string;
  isPurchased: boolean;
  purchasedBy: string | null;
  imageUrl: string | null;
  price: string | null;
  giftFor: {
    name: string;
  };
  owner: string;
  isOwner: boolean;
  id: string;
}

interface GiftsResponse {
  gifts: FormattedGift[];
}

interface ErrorResponse {
  error: string;
}

export default async function getGiftsByGroup(
  req: NextApiRequest,
  res: NextApiResponse<GiftsResponse | ErrorResponse>
) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user?.email) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      query: { groupId },
    } = req;

    const { data: gifts, error } = await supabase
      .from(getTableName("gifts"))
      .select(
        "id, name, description, url, is_purchased, purchased_by, image_url, price, gift_for_name, owner"
      )
      .eq("group_id", groupId)
      .order("created_at", { ascending: false })
      .limit(128);

    if (error) {
      console.error("Error fetching gifts:", error);
      return res.status(500).json({ error: error.message });
    }

    if (gifts && gifts.length) {
      const formattedGifts: FormattedGift[] = (gifts as Gift[]).map((gift) => ({
        name: gift.name,
        description: gift.description,
        url: gift.url,
        isPurchased: gift.is_purchased,
        purchasedBy: gift.purchased_by,
        imageUrl: gift.image_url,
        price: gift.price,
        giftFor: {
          name: gift.gift_for_name,
        },
        owner: gift.owner,
        isOwner: gift.owner === session.user?.email,
        id: gift.id,
      }));

      return res.status(200).json({ gifts: formattedGifts });
    } else {
      return res.status(200).json({ gifts: [] });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: (error as Error).message });
  }
}
