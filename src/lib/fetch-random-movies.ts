import { MovieData } from "@/types";

export default async function fetchRandomMovies(): Promise<MovieData[]> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movie/random`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch random movies");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}
