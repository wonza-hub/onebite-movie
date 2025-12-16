import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import MovieItem from "@/components/movie-item";
import style from "@/pages/index.module.css";
import {
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchMovies from "@/lib/fetch-movies";
import { MovieData } from "@/types";

// export const getServerSideProps = async (
//   context: GetServerSidePropsContext
// ) => {
//   const q = context.query.q as string;
//   const movies = await fetchMovies(q);

//   return {
//     props: {
//       movies,
//     },
//   };
// };

// export default function Page({
//   movies,
// }: InferGetServerSidePropsType<typeof getServerSideProps>) {
export default function Page() {
  // SSG + 클라이언트 렌더링 방식
  const [movies, setMovies] = useState<MovieData[]>([]);

  const router = useRouter();
  const q = router.query.q;

  useEffect(() => {
    const fetchData = async () => {
      if (q) {
        const movies = await fetchMovies(q as string);
        setMovies(movies);
      }
    };
    fetchData();
  }, [q]);

  return (
    <>
      <div className={style.recommend_movie_list}>
        {movies.map((movie) => (
          <MovieItem key={movie.id} {...movie} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
