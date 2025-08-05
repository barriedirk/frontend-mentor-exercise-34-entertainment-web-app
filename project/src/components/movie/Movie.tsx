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
  const { title, year, category, thumbnail, isBookmarked } = item;

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
        "relative radius-8px",
        isRegular ? styles["movie--regular"] : styles["movie--trending"]
      )}
    >
      {isRegular && (
        <picture>
          <source media="(min-width:1000px)" srcSet={thumbnail.regular.large} />
          <source media="(min-width:500px)" srcSet={thumbnail.regular.medium} />
          <img
            src={thumbnail.regular.small}
            alt={`Thumbnail for ${title} (${category}, ${year})`}
          />
        </picture>
      )}
      {!isRegular && (
        <picture>
          <source
            media="(min-width:1000px)"
            srcSet={thumbnail.trending.large}
          />
          <img
            src={thumbnail.trending.small}
            alt={`Thumbnail for ${title} (${category}, ${year})`}
          />
        </picture>
      )}
      <figcaption className={styles["movie__caption"]}>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-400">
          {year} • {category}
        </p>
      </figcaption>

      {isBookmarked && (
        <button
          type="button"
          aria-label={
            isBookmarked ? "Remove from bookmarks" : "Add to bookmarks"
          }
          className={clsx(styles["movie__bookmark"], "cursor-pointer")}
          onClick={bookmark}
        >
          <Icon name="bookmarkEmpty" />
        </button>
      )}

      <button
        type="button"
        aria-label={`Play ${title}`}
        className={clsx(
          styles["movie__play"],
          "absolute inset-0 z-20 flex justify-center items-center opacity-15"
        )}
        onClick={play}
      >
        <span className="flex flex-row gap-2 items-center border radius-28px p-2">
          <Icon name="play" />
          <span>Play</span>
        </span>
      </button>
    </figure>
  );
}
