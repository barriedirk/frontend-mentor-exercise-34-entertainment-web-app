import clsx from "clsx";

import styles from "./Movie.module.css";

import { useMovieContext } from "./MovieContext";

export default function MovieImage() {
  const { item, type, isLoaded, setIsLoaded } = useMovieContext();

  const isRegular = type === "regular";
  const isTrending = type === "trending";
  const isPoster = type === "poster";

  const thumbnail = isTrending
    ? item.thumbnail.trending
    : item.thumbnail.regular;

  return (
    <picture className={styles["movie__picture"]}>
      {isTrending ? (
        <source media="(min-width:900px)" srcSet={thumbnail.large} />
      ) : (
        <>
          <source media="(min-width:900px)" srcSet={thumbnail.large} />
          <source
            media="(min-width:500px)"
            srcSet={item.thumbnail.regular.medium}
          />
        </>
      )}

      <img
        loading="lazy"
        className={clsx(
          styles["movie__image"],
          "radius-8px",
          isTrending && styles["movie__image--trending"],
          isRegular && styles["movie__image--regular"],
          isPoster && styles["movie__image--poster"],
          isLoaded && styles["movie__image--loaded"]
        )}
        onLoad={() => setIsLoaded(true)}
        src={thumbnail.small}
        alt={`Thumbnail for ${item.title} (${item.category}, ${item.year})`}
      />
    </picture>
  );
}
