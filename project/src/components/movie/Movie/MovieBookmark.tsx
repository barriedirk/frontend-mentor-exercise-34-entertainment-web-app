import clsx from "clsx";

import styles from "./Movie.module.css";

import { useMovieContext } from "./MovieContext";

import Icon from "@/components/Icon";
import { useIsBookmarkHosted } from "@/hooks/useIsBookmarkHosted";
import { useActions } from "@/hooks/useActions";

export default function MovieBookmark() {
  const { item } = useMovieContext();
  const { idBookmark, isBookmarkHosted } = useIsBookmarkHosted(item);
  const { addBookmark, deleteBookmark } = useActions();

  const toggle = () => {
    if (isBookmarkHosted) {
      deleteBookmark(idBookmark);
    } else {
      addBookmark(idBookmark, item);
    }
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
        className={clsx(
          "w-[11px] h-[14px] z-40 text-black-custom hover:text-white-custom"
        )}
        name={isBookmarkHosted ? "bookmarkFull" : "bookmarkEmpty"}
      />
    </button>
  );
}
