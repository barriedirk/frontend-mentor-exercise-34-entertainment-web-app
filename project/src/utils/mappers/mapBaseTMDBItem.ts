import type { MediaItem, CategoryType } from "@/models/media";

const posterBase = "https://image.tmdb.org/t/p/w500";
const backdropBase = "https://image.tmdb.org/t/p/original";

export function mapBaseTMDBItem(
  id: number,
  title: string,
  year: string | undefined,
  category: CategoryType,
  voteAverage: number,
  posterPath: string | null,
  backdropPath: string | null
): MediaItem {
  const poster = posterPath ? `${posterBase}${posterPath}` : "";
  const backdrop = backdropPath ? `${backdropBase}${backdropPath}` : "";

  return {
    id,
    title: title || "Untitled",
    year: year ? parseInt(year.slice(0, 4), 10) : 0,
    category,
    rating: `${Math.round(voteAverage * 10)}/100`,
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
