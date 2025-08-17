import { useComputed, useSignal, useSignalEffect } from "@preact/signals-react";
import { useSignals } from "@preact/signals-react/runtime";

import clsx from "clsx";

import styles from "./Home.module.css";

import { useDebouncedSignal } from "@/hooks/useDebouncedSignal";

import Movie from "@/components/movie/Movie";
import Search from "@/components/forms/search/Search";

interface ThumbnailSizeMap {
  large?: string;
  medium?: string;
  small?: string;
}

import type { MediaItem } from "@/models/media";
import mediaData from "@/data/data.json";
import { useMemo } from "react";

export default function Mockup() {
  useSignals();

  const items = useMemo(() => {
    const clonedData = (mediaData as MediaItem[]).map((originalItem) => {
      const item = structuredClone(originalItem);
      const { trending, regular } = item.thumbnail;

      [trending, regular].forEach((thumb) => {
        if (!thumb) return;

        const image = thumb as ThumbnailSizeMap;

        ["large", "medium", "small"].forEach((size) => {
          const key = size as keyof ThumbnailSizeMap;

          if (image[key] && !image[key]!.startsWith(import.meta.env.BASE_URL)) {
            image[key] = `${import.meta.env.BASE_URL}${image[key]}`;
          }
        });
      });

      return item;
    });

    return clonedData;
  }, []);

  const searchTerm = useSignal<string>("");
  const debouncedSearchTerm = useDebouncedSignal(searchTerm, 500);

  useSignalEffect(() => {
    console.log("Mockup", searchTerm.value);
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

      {debouncedSearchTerm.value.length === 0 && (
        <div className={clsx(styles["home__results"])}>
          <h2 className="my-[24px] text-white-custom text-preset-1-mobile lg:text-preset-1">
            Trending
          </h2>
          <section
            tabIndex={0}
            role="region"
            aria-label="Trending movies"
            className={clsx(
              styles["home__results--grid"],
              "gap-5",
              "grid-result grid-result--trending"
            )}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {trendingItems.value.length === 0 ? (
              <p className="text-blue-500 text-preset-3 my-[24px]">
                No trending titles found.
              </p>
            ) : (
              trendingItems.value.map((item) => (
                <Movie
                  key={`${item.category}-${item.id ?? ""}-${item.title}`}
                  item={item}
                  type="trending"
                >
                  <Movie.Image />
                  <Movie.Caption />
                  <Movie.PlayButton />
                  <Movie.Bookmark />
                </Movie>
              ))
            )}
          </section>
        </div>
      )}

      <div className={clsx(styles["home__results"])}>
        <h2
          className="my-[24px] text-white-custom text-preset-1-mobile lg:text-preset-1"
          aria-live="polite"
        >
          {debouncedSearchTerm.value.length === 0 &&
            recommendedItems.value.length > 0 &&
            "Recommended for you"}
          {debouncedSearchTerm.value.length > 0 &&
            recommendedItems.value.length === 0 &&
            "No recommendations found"}
          {debouncedSearchTerm.value.length > 0 &&
            recommendedItems.value.length > 0 &&
            `Found ${recommendedItems.value.length} results for ‘${debouncedSearchTerm.value}’`}
        </h2>
        <section
          tabIndex={0}
          role="region"
          aria-label="Recommended movies"
          className={clsx(
            styles["home__results--grid"],
            "grid-result grid-result--regular"
          )}
        >
          {recommendedItems.value.map((item) => (
            <Movie
              key={`${item.category}-${item.id ?? ""}-${item.title}`}
              item={item}
              type="regular"
            >
              <Movie.Image />
              <Movie.Caption />
              <Movie.PlayButton />
              <Movie.Bookmark />
            </Movie>
          ))}
        </section>
      </div>
    </section>
  );
}
