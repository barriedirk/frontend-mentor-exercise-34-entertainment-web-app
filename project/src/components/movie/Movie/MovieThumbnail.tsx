import clsx from "clsx";

import { useMovieContext } from "./MovieContext";

export default function MovieThumbnail() {
  const { item, type } = useMovieContext();

  const isTrending = type === "trending";

  const thumbnail = isTrending
    ? item.thumbnail.trending
    : item.thumbnail.regular;

  return (
    <img
      className={clsx("radius-8px")}
      style={{ maxHeight: "150px", width: "auto" }}
      src={thumbnail.small}
      alt={`Thumbnail for ${item.title} (${item.category}, ${item.year})`}
    />
  );
}
