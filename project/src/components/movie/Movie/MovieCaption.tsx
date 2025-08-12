import clsx from "clsx";

import { useMovieContext } from "./MovieContext";

import Icon from "@/components/Icon";

interface MovieCaptionProps {
  isTrailer?: boolean;
}

export default function MovieCaption({ isTrailer }: MovieCaptionProps) {
  const { item, type } = useMovieContext();
  const isTrending = type === "trending";
  const isMovie = item.category === "Movie";

  return (
    <figcaption className={clsx("movie__caption flex gap-2 flex-col")}>
      <p
        className={clsx(
          "flex justify-start items-center gap-2 text-white-75-custom",
          isTrailer
            ? "text-preset-5 md:text-preset-3"
            : isTrending
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
          isTrailer
            ? "text-preset-2-light md:text-preset-1"
            : isTrending
              ? "text-preset-3-mobile md:text-preset-3"
              : "text-preset-4-mobile md:text-preset-5"
        )}
      >
        {item.title}
      </h3>
    </figcaption>
  );
}
