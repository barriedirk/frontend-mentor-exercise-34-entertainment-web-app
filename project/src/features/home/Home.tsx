import { useComputed, useSignal, useSignalEffect } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";
import { useEffect } from "react";

import clsx from "clsx";

import styles from "./Home.module.css";

import { useDebouncedSignal } from "@/hooks/useDebouncedSignal";
import Movie from "@/components/movie/Movie";
import Search from "@/components/forms/search/Search";

import type { MediaItem } from "@/types/media";
import mediaData from "@/data/data.json";

export default function Home() {
  useSignals();

  const items = mediaData as MediaItem[];
  const searchTerm = useSignal<string>("");
  const debouncedSearchTerm = useDebouncedSignal(searchTerm, 500);

  // useEffect(() => {}, []);
  // const searchValue = useComputed(() => {
  //   console.log("useComputed", searchTerm.value);

  //   return searchTerm.value;
  // });

  useSignalEffect(() => {
    console.log("Home", searchTerm.value);
  });

  const trendingItems = useComputed(() =>
    items.filter(
      (item) =>
        item.isTrending &&
        item.title
          .toLowerCase()
          .includes(debouncedSearchTerm.value.toLowerCase())
    )
  );

  const recommendedItems = useComputed(() =>
    items.filter(
      (item) =>
        !item.isTrending &&
        item.title
          .toLowerCase()
          .includes(debouncedSearchTerm.value.toLowerCase())
    )
  );

  return (
    <section className={clsx(styles["homes"], "mt-[24px] ml-[16px] mr-[16px]")}>
      <Search placeholder={"Home"} searchTerm={searchTerm} />
      <div className={clsx(styles["home__results"], "mt-[24px]")}>
        <h2 className="text-white-custom text-preset-1-mobile lg:text-preset-1">
          Trending
        </h2>
        <section
          className={clsx(
            styles["home__results--grid"],
            "grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {trendingItems.value.length === 0 ? (
            <p className="text-gray-400">No trending titles found.</p>
          ) : (
            trendingItems.value.map((item) => (
              <Movie key={item.title} type="trending" item={item} />
            ))
          )}
        </section>
      </div>
      <div className={clsx(styles["home__results"], "mt-[24px]")}>
        <h2 className="text-white-custom text-preset-1-mobile lg:text-preset-1">
          Recommended for you
        </h2>
        <section
          className={clsx(
            styles["home__results--grid"],
            "grid gap-4 md:grid-cols-2 lg:grid-cols-4"
          )}
        >
          {recommendedItems.value.length === 0 ? (
            <p className="text-gray-400">No recommendations found.</p>
          ) : (
            recommendedItems.value.map((item) => (
              <Movie key={item.title} type="regular" item={item} />
            ))
          )}
        </section>
      </div>
      {/* <h1>Home - {debouncedSearchTerm.value}</h1> */}
    </section>
  );
}
