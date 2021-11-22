import { getSession } from "next-auth/react";

const endpoint = process.env.GIFT_IMAGES_ENDPOINT;
const numImages = process.env.GIFT_IMAGES_NUM_RETURNED || 12;

export default async function getGiftImages(req, res) {
  const session = await getSession({ req });
  const {
    query: { url },
  } = req;

  if (session && req.method === "GET") {
    const response = await fetch(`${endpoint}?url=${url}`);
    const images = await response.json();

    if (images && images.length) {
      res.status(200).json({ data: { images: images.slice(0, numImages) } });
    } else {
      console.log(`No images found for ${url}`);

      res.status(200).json({ data: { images: [] } });
    }
  } else {
    res.status(401);
  }

  res.end();
}
