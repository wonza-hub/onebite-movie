import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";
import { delay } from "@/utils/delay";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  console.log("delay");
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

  return movies.map((movie) => <MovieItem key={movie.id} {...movie} />);
}
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;

  return (
    <div className={style.container}>
      <Suspense key={q || ""} fallback={<MovieListSkeleton count={10} />}>
        <SearchResult q={q || ""} />
      </Suspense>
    </div>
  );
}
