import { supabase, getTableName } from "./supabase";

const endpoint = process.env.GIFT_IMAGES_ENDPOINT;

/**
 * Automatically fetches an image for a gift from its URL and updates the gift record.
 * This function is designed to be called asynchronously (fire-and-forget) after gift creation.
 *
 * @param giftId - The ID of the gift to update
 * @param url - The URL to fetch images from
 */
export async function autoFetchGiftImage(
  giftId: string,
  url: string
): Promise<void> {
  try {
    if (!url || !endpoint) {
      console.log(
        `autoFetchGiftImage - Skipping image fetch for gift ${giftId}: ${
          !url ? "no URL provided" : "GIFT_IMAGES_ENDPOINT not configured"
        }`
      );
      return;
    }

    console.log(`autoFetchGiftImage - Fetching images for gift ${giftId} from ${url}`);

    // Fetch images from the external endpoint
    const response = await fetch(`${endpoint}?url=${encodeURIComponent(url)}`);

    if (!response.ok) {
      console.error(
        `autoFetchGiftImage - Failed to fetch images for gift ${giftId}:`,
        response.statusText
      );
      return;
    }

    const images = await response.json();

    if (!images || !Array.isArray(images) || images.length === 0) {
      console.log(`autoFetchGiftImage - No images found for gift ${giftId}`);
      return;
    }

    // Get the first image
    const firstImageUrl = images[0];

    console.log(
      `autoFetchGiftImage - Updating gift ${giftId} with image: ${firstImageUrl}`
    );

    // Update the gift with the first image
    const { error } = await supabase
      .from(getTableName("gifts"))
      .update({ image_url: firstImageUrl })
      .eq("id", giftId);

    if (error) {
      console.error(
        `autoFetchGiftImage - Error updating gift ${giftId} with image:`,
        error
      );
      return;
    }

    console.log(
      `autoFetchGiftImage - Successfully updated gift ${giftId} with image`
    );
  } catch (error) {
    console.error(
      `autoFetchGiftImage - Exception while processing gift ${giftId}:`,
      error
    );
  }
}
