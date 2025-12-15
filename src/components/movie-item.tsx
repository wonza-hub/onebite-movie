import type { MovieData } from "@/types";
import Link from "next/link";
import style from "./movie-item.module.css";
import Image from "next/image";

export default function MovieItem({ id, posterImgUrl, title }: MovieData) {
  return (
    <Link href={`/movie/${id}`} className={style.container}>
      <Image src={posterImgUrl} alt={title} fill />
    </Link>
  );
}
