import { mapBaseTMDBItem } from "./mapBaseTMDBItem";

import type { TMDBMovieItem } from "@/models/TMDBMovieItem";
import type { MediaItem } from "@/models/media";

export function mapMovieToMediaItem(movie: TMDBMovieItem): MediaItem {
  return mapBaseTMDBItem(
    movie.id,
    movie.title || movie.original_title || "Untitled",
    movie.release_date,
    "Movie",
    movie.vote_average,
    movie.poster_path,
    movie.backdrop_path
  );
}
