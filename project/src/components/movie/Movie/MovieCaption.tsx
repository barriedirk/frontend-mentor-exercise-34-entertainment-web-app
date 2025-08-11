import clsx from "clsx";

import { useMovieContext } from "./MovieContext";

import Icon from "@/components/Icon";

export default function MovieCaption() {
  const { item, type } = useMovieContext();
  const isTrending = type === "trending";
  const isMovie = item.category === "Movie";

  return (
    <figcaption className="flex flex-col gap-2">
      <p
        className={clsx(
          "flex justify-start items-center gap-2 text-white-75-custom",
          isTrending
            ? "text-preset-5-mobile md:text-preset-4"
            : "text-preset-6-mobile md:text-preset-5"
        )}
      >
        {item.year} •
        <Icon
          name={isMovie ? "navMovies" : "navHome"}
          className="text-white-75-custom w-[12px] h-[12px]"
        />
        {item.category} • {item.rating}
      </p>

      <h3
        className={clsx(
          "text-white-custom",
          isTrending
            ? "text-preset-3-mobile md:text-preset-3"
            : "text-preset-4-mobile md:text-preset-5"
        )}
      >
        {item.title}
      </h3>
    </figcaption>
  );
}
