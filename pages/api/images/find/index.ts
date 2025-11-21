import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

const endpoint = process.env.GIFT_IMAGES_ENDPOINT;
const numImages = process.env.GIFT_IMAGES_NUM_RETURNED || 12;

interface ImageData {
  images: any[];
}

interface SuccessResponse {
  data: ImageData;
}

export default async function getGiftImages(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | void>
) {
  const session = await getSession({ req });
  const {
    query: { url },
  } = req;

  if (session && req.method === "GET") {
    const response = await fetch(`${endpoint}?url=${url}`);
    const images = await response.json();

    if (images && images.length) {
      res.status(200).json({ data: { images: images.slice(0, Number(numImages)) } });
    } else {
      console.log(`No images found for ${url}`);

      res.status(200).json({ data: { images: [] } });
    }
  } else {
    res.status(401);
  }

  res.end();
}
