import type { MediaItem } from "@/models/media";
import type { TMDBTrendingItem } from "@/models/TMDBTrendingItem";

export function mapTrendingToMediaItem(item: TMDBTrendingItem): MediaItem {
  const id = item.id;
  const title = item.title || item.name || "Untitled";
  const year = item.release_date || item.first_air_date || "0000";
  const category = item.media_type === "movie" ? "Movie" : "TV Series";

  const posterBase = "https://image.tmdb.org/t/p/w500";
  const backdropBase = "https://image.tmdb.org/t/p/original";

  const poster = item.poster_path
    ? `${posterBase}${item.poster_path}`
    : `${backdropBase}${item.backdrop_path}/assets/placeholder.svg`;
  const backdrop = item.backdrop_path
    ? `${backdropBase}${item.backdrop_path}`
    : `${backdropBase}${item.backdrop_path}/assets/placeholder.svg`;

  return {
    id,
    title,
    year: parseInt(year.slice(0, 4), 10),
    category,
    rating: `${Math.round(item.vote_average * 10)}/100`,
    isBookmarked: false,
    isTrending: false,
    thumbnail: {
      trending: {
        small: backdrop,
        large: backdrop,
      },
      regular: {
        small: poster,
        medium: poster,
        large: poster,
      },
    },
  };
}
