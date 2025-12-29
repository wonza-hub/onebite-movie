import MovieItem from "@/components/movie-item";
import style from "./page.module.css";
import { MovieData } from "@/types";
import { delay } from "@/utils/delay";
import { Suspense } from "react";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";

export const dynamic = "force-dynamic";

async function AllMovies() {
  await delay(2000);
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`, {
    cache: "force-cache",
  });
  if (!response.ok) {
    return <div>Failed to fetch movies</div>;
  }

  const allMovies: MovieData[] = await response.json();

  return (
    <>
      {allMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </>
  );
}

async function RecommendMovies() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>Failed to fetch recommended movies</div>;
  }

  const recommendMovies: MovieData[] = await response.json();

  return (
    <>
      {recommendMovies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </>
  );
}

export default function Page() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 영화</h3>
        <div className={style.recommend_movie_list}>
          <Suspense fallback={<MovieListSkeleton count={3} />}>
            <RecommendMovies />
          </Suspense>
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_movie_list}>
          <Suspense fallback={<MovieListSkeleton count={5} />}>
            <AllMovies />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
