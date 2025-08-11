import clsx from "clsx";

import styles from "./Movie.module.css";

import { useMovieContext } from "./MovieContext";

import Icon from "@/components/Icon";

export default function MovieBookmark() {
  const { item } = useMovieContext();

  const toggle = () => {
    console.log(`Bookmark toggled for ${item.title}`);
  };

  return (
    <button
      type="button"
      aria-label={
        item.isBookmarked
          ? `Remove ${item.title} from bookmarks`
          : `Add ${item.title} to bookmarks`
      }
      onClick={toggle}
      className={clsx(
        styles["movie__bookmark"],
        "cursor-pointer flex justify-center items-center"
      )}
    >
      <Icon
        name={item.isBookmarked ? "bookmarkFull" : "bookmarkEmpty"}
        className={clsx(
          "w-[11px] h-[14px] z-40 text-black-custom hover:text-white-custom"
        )}
      />
    </button>
  );
}
