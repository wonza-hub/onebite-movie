import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/search?q=${q}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>Failed to fetch movies</div>;
  }
  const movies: MovieData[] = await response.json();
  if (movies.length === 0) {
    return <div>No movies found</div>;
  }

  return (
    <div className={style.container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
