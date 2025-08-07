import clsx from "clsx";

import styles from "./Movie.module.css";

import { type MediaType, type MediaItem } from "@/types/media";

import Icon from "@/components/Icon";

interface MovieProps {
  type: MediaType;
  item: MediaItem;
  onPlay?: (item: MediaItem) => void;
  onBookmarkToggle?: (item: MediaItem) => void;
}

export default function Movie({ type, item }: MovieProps) {
  const isRegular = type === "regular";
  const { title, year, category, rating, thumbnail, isBookmarked } = item;
  const isMovie = category === "Movie";

  const bookmark = () => {
    console.log(`Bookmark toggled for: ${title}`);
  };

  const play = () => {
    console.log(`Playing: ${title}`);
  };

  return (
    <figure
      className={clsx(
        styles["movie"],
        isRegular ? styles["movie--regular"] : styles["movie--trending"]
      )}
    >
      {isRegular && (
        <picture className={styles["movie__picture"]}>
          <source media="(min-width:1000px)" srcSet={thumbnail.regular.large} />
          <source media="(min-width:500px)" srcSet={thumbnail.regular.medium} />
          <img
            className={clsx(
              styles["movie__image--regular"],
              "movie__image radius-8px"
            )}
            src={thumbnail.regular.small}
            alt={`Thumbnail for ${title} (${category}, ${year})`}
          />
        </picture>
      )}
      {!isRegular && (
        <picture className={styles["movie__picture"]}>
          <source
            media="(min-width:1000px)"
            srcSet={thumbnail.trending.large}
          />
          <img
            className={clsx(
              styles["movie__image--trending"],
              "movie__image radius-8px"
            )}
            src={thumbnail.trending.small}
            alt={`Thumbnail for ${title} (${category}, ${year})`}
          />
        </picture>
      )}

      <figcaption className={clsx("movie__caption flex gap-2 flex-col")}>
        <p
          className={clsx(
            "flex justify-start items-center gap-2 text-white-75-custom",
            isRegular
              ? "text-preset-6-mobile md:text-preset-5"
              : "text-preset-5-mobile md:text-preset-4"
          )}
        >
          {year} •
          <Icon
            name={isMovie ? "navMovies" : "navHome"}
            className="text-white-75-custom w-[12px] h-[12px]"
          />
          {category} • {rating}
        </p>

        <h3
          className={clsx(
            "text-white-custom",
            isRegular
              ? "text-preset-4-mobile md:text-preset-5"
              : "text-preset-3-mobile md:text-preset-3"
          )}
        >
          {title}
        </h3>
      </figcaption>

      {!isBookmarked && (
        <button
          type="button"
          aria-label={
            isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
          }
          className={clsx(
            styles["movie__bookmark"],
            "cursor-pointer flex justify-center items-center"
          )}
          onClick={bookmark}
        >
          <Icon
            className={clsx(
              "w-[11px] h-[14px] z-40 text-black-custom hover:text-white-custom"
            )}
            name="bookmarkEmpty"
          />
        </button>
      )}

      <div
        className={clsx(
          styles["movie__play"],
          "absolute inset-0 z-20 flex justify-center items-center"
        )}
      >
        <button
          type="button"
          aria-label={`Play ${title}`}
          className={clsx(
            styles["movie__btn-play"],
            "flex justify-center items-center gap-2 radius-28px"
          )}
          onClick={play}
        >
          <span className="flex flex-row gap-2 items-center border radius-28px p-2 text-preset-3-mobile md:text-preset-3">
            <Icon name="play" className="h-[20px] w-[20px]" />
            <span>Play</span>
          </span>
        </button>
      </div>
    </figure>
  );
}
