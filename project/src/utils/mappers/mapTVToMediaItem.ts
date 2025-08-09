import type { MediaItem } from "@/models/media";
import type { TMDBTVSerieItem } from "@/models/TMDBTVSerieItem";
import { mapBaseTMDBItem } from "./mapBaseTMDBItem";

export function mapTVToMediaItem(tv: TMDBTVSerieItem): MediaItem {
  return mapBaseTMDBItem(
    tv.id,
    tv.name || tv.original_name || "Untitled",
    tv.first_air_date,
    "TV Series",
    tv.vote_average,
    tv.poster_path,
    tv.backdrop_path
  );
}
