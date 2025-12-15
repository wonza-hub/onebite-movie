import { MovieData } from "@/types";

export default async function fetchMovies(): Promise<MovieData[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movie`;

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
