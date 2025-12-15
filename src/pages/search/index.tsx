import SearchableLayout from "@/components/searchable-layout";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import MovieItem from "@/components/movie-item";
import style from "@/pages/index.module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import fetchMovies from "@/lib/fetch-movies";

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const q = context.query.q as string;
  const movies = await fetchMovies(q);

  return {
    props: {
      movies,
    },
  };
};

export default function Page({
  movies,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
