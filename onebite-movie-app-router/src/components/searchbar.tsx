"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import style from "./searchbar.module.css";

export default function Searchbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const onSubmit = () => {
    if (!search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className={style.container}>
      <input
        type="text"
        placeholder="Search"
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
      />
      <button onClick={onSubmit}>Search</button>
    </div>
  );
}
