import { getSession } from "next-auth/react";

// const isProd = process.env.IS_PROD;
const endpoint = process.env.GIFT_IMAGES_ENDPOINT;
const numImages = process.env.GIFT_IMAGES_NUM_RETURNED || 10;

export default async function getGiftImages(req, res) {
  const session = await getSession({ req });
  const {
    query: { url },
  } = req;

  if (session && req.method === "GET") {
    const response = await fetch(`${endpoint}?url=${url}`);
    const images = await response.json();

    res.status(200).json({ data: { images: images.slice(0, numImages) } });
  } else {
    res.status(401);
  }

  res.end();
}
