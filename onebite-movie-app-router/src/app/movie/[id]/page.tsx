import { MovieData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movie`);

  if (!response.ok) {
    return [];
  }
  const movies: MovieData[] = await response.json();
  return movies.map((movie) => ({ id: movie.id.toString() }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/movie/${id}`,
    {
      cache: "force-cache",
    }
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>Failed to fetch movie</div>;
  }
  const movie: MovieData = await response.json();

  const {
    title,
    subTitle,
    company,
    runtime,
    description,
    posterImgUrl,
    releaseDate,
    genres,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>
      <div className={style.info_container}>
        <div>
          <h2>{title}</h2>
          <div>
            {releaseDate} / {genres.join(", ")} / {runtime}분
          </div>
          <div>{company}</div>
        </div>
        <div>
          <div className={style.subTitle}>{subTitle}</div>
          <div className={style.description}>{description}</div>
        </div>
      </div>
    </div>
  );
}
