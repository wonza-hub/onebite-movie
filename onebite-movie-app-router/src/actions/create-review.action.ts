"use server";

import { revalidateTag } from "next/cache";

export default async function createReviewAction(formData: FormData) {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!content || !author || !movieId) {
    return;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
      method: "POST",
      body: JSON.stringify({ movieId, content, author }),
    });

    revalidateTag(`review-${movieId}`);
  } catch (error) {
    console.error(error);
    return;
  }
}
