import { MovieData } from "@/types";

export default async function fetchOneMovie(
  id: string
): Promise<MovieData | null> {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch movie");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
