import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import movies from "@/mock/data/movies.json";
import MovieItem from "@/components/movie-item";
import style from "@/pages/index.module.css";

export default function Page() {
  const router = useRouter();
  const q = router.query.q;

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(q as string)
  );

  return (
    <>
      <div className={style.recommend_movie_list}>
        {filteredMovies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
