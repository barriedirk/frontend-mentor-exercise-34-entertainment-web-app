import clsx from "clsx";

import { useMovieContext } from "./MovieContext";

import styles from "./Movie.module.css";

import Icon from "@/components/Icon";

export default function MoviePlayButton() {
  const { item, fetchTrailer } = useMovieContext();

  return (
    <div
      className={clsx(
        styles["movie__play"],
        "absolute inset-0 z-20 flex justify-center items-center"
      )}
    >
      <button
        type="button"
        aria-label={`Play trailer for ${item.title}`}
        onClick={fetchTrailer}
        className={clsx(
          styles["movie__btn-play"],
          "flex justify-center items-center gap-2 radius-28px"
        )}
      >
        <span className="flex flex-row gap-2 items-center border radius-28px p-2 text-preset-3-mobile md:text-preset-3">
          <Icon name="play" className="h-[20px] w-[20px]" />
          <span>Play</span>
        </span>
      </button>
    </div>
  );
}
