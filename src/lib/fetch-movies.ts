import { MovieData } from "@/types";

export default async function fetchMovies(q?: string): Promise<MovieData[]> {
  let url = `${process.env.NEXT_PUBLIC_API_URL}/movie`;

  // 검색 파라미터가 있는 경우
  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
