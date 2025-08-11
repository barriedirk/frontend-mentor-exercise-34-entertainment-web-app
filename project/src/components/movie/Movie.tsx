import { useCallback, useMemo, useState } from "react";

import clsx from "clsx";

import styles from "./Movie.module.css";

import { type MediaType, type MediaItem } from "@/models/media";

import { fetchTrailerMedia, type FetchTrailerResponse } from "@/api/tmdb";

import { useApi } from "@/hooks/useApi";
import { useFadeInOnView } from "@/hooks/useFadeInOnView";

import Icon from "@/components/Icon";
import Modal from "@/components/modals/Modal";

interface MovieProps {
  type: MediaType;
  item: MediaItem;
  onPlay?: (item: MediaItem) => void;
  onBookmarkToggle?: (item: MediaItem) => void;
}

type ParamType = [number, "movie" | "tv"];

export default function Movie({ type, item }: MovieProps) {
  const [showModal, setShowModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useFadeInOnView(100);

  const isRegular = type === "regular";
  const isTrending = type === "trending";
  const isPoster = type === "poster";
  const { title, year, category, rating, thumbnail, isBookmarked } = item;
  const isMovie = category === "Movie";

  const params: ParamType = useMemo(
    () => [item.id, isMovie ? "movie" : "tv"],
    [item, isMovie]
  );

  const caption = useMemo(() => {
    return (
      <>
        <p
          className={clsx(
            "flex justify-start items-center gap-2 text-white-75-custom",
            isTrending
              ? "text-preset-5-mobile md:text-preset-4"
              : "text-preset-6-mobile md:text-preset-5"
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
            isTrending
              ? "text-preset-3-mobile md:text-preset-3"
              : "text-preset-4-mobile md:text-preset-5"
          )}
        >
          {title}
        </h3>
      </>
    );
  }, [isTrending, year, isMovie, category, rating, title]);

  const { loading, error, data, fetch, controller } = useApi<
    FetchTrailerResponse,
    ParamType
  >(fetchTrailerMedia, {
    autoFetch: false,
    params,
  });

  const play = useCallback(() => {
    if (controller) controller.abort();

    fetch(params);
    setShowModal(true);
  }, [fetch, controller, params]);

  const bookmark = () => {
    console.log(`Bookmark toggled for: ${title}`);
  };

  return (
    <>
      <figure
        ref={ref}
        className={clsx(
          "fade-start",
          styles["movie"],
          isRegular && styles["movie--regular"],
          isTrending && styles["movie--trending"],
          isPoster && styles["movie--poster"]
        )}
      >
        {isTrending && (
          <picture className={styles["movie__picture"]}>
            <source
              media="(min-width:1000px)"
              srcSet={thumbnail.trending.large}
            />
            <img
              loading="lazy"
              className={clsx(
                styles["movie__image"],
                styles["movie__image--trending"],
                "movie__image radius-8px",
                isLoaded && styles["movie__image--loaded"]
              )}
              onLoad={() => setIsLoaded(true)}
              src={thumbnail.trending.small}
              alt={`Thumbnail for ${title} (${category}, ${year})`}
            />
          </picture>
        )}

        {(isRegular || isPoster) && (
          <picture className={styles["movie__picture"]}>
            <source
              media="(min-width:1000px)"
              srcSet={thumbnail.regular.large}
            />
            <source
              media="(min-width:500px)"
              srcSet={thumbnail.regular.medium}
            />
            <img
              loading="lazy"
              className={clsx(
                styles["movie__image"],
                isRegular && styles["movie__image--regular"],
                isPoster && styles["movie__image--poster"],
                "movie__image radius-8px",
                isLoaded && styles["movie__image--loaded"]
              )}
              onLoad={() => setIsLoaded(true)}
              src={thumbnail.regular.small}
              alt={`Thumbnail for ${title} (${category}, ${year})`}
            />
          </picture>
        )}

        <figcaption className={clsx("movie__caption flex gap-2 flex-col")}>
          {caption}
        </figcaption>

        {!isBookmarked && (
          <button
            type="button"
            aria-label={
              isBookmarked
                ? `Remove ${title} from bookmarks`
                : `Add ${title} to bookmarks`
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
            aria-label={`Play trailer for ${title}`}
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

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          {loading && (
            <p className="text-white-custom text-preset-1">
              Loading trailer...
            </p>
          )}
          {!loading && error && (
            <p className="text-white-custom text-preset-1">
              Error Loading trailer...
            </p>
          )}
          {!loading && !error && data?.key && (
            <iframe
              className="w-[80vw] h-[45vw] max-w-[960px] max-h-[540px]"
              src={`https://www.youtube.com/embed/${data.key}`}
              title="YouTube trailer"
              allowFullScreen
            ></iframe>
          )}
          {!loading && !error && !data?.key && (
            <p className="text-white-custom text-preset-1">No trailer found.</p>
          )}
          <div className="mt-[20px] flex gap-5 items-start justify-start">
            <div>
              <img
                loading="lazy"
                className={clsx(
                  styles["movie__image"],
                  isRegular && styles["movie__image--regular"],
                  isPoster && styles["movie__image--poster"],
                  "movie__image radius-8px",
                  isLoaded && styles["movie__image--loaded"]
                )}
                style={{ maxHeight: "150px" }}
                src={thumbnail.regular.small}
                alt={`Thumbnail for ${title} (${category}, ${year})`}
              />
            </div>
            <div className="flex gap-2 flex-col">{caption}</div>
          </div>
        </Modal>
      )}
    </>
  );
}
