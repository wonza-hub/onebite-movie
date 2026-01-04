import { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";
import Image from "next/image";

export default function MovieItem(props: MovieData) {
  return (
    <Link className={style.container} href={`/movie/${props.id}`}>
      <Image src={props.posterImgUrl} alt={`영화 ${props.title}의 포스터 이미지`} fill />
    </Link>
  );
}
