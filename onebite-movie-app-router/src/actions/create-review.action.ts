"use server";

import { revalidateTag } from "next/cache";

export default async function createReviewAction(_: any, formData: FormData) {
  const movieId = formData.get("movieId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!content || !author || !movieId) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요.",
    };
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/review`, {
      method: "POST",
      body: JSON.stringify({ movieId, content, author }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    revalidateTag(`review-${movieId}`);

    return {
      status: true,
      error: "",
    };
  } catch (error) {
    console.error(error);
    return {
      status: false,
      error: `리뷰 작성에 실패했습니다. ${error}`,
    };
  }
}
