import type { MediaItem } from "@/types/media";
import { apiFetch } from "./client"; // adjust path if needed

type TMDBItem = {
  id: number;
  media_type: "movie" | "tv";
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
};

export function mapTMDBToMediaItem(item: TMDBItem): MediaItem {
  const title = item.title || item.name || "Untitled";
  const year = item.release_date || item.first_air_date || "0000";
  const category = item.media_type === "movie" ? "Movie" : "TV Series";

  const posterBase = "https://image.tmdb.org/t/p/w500";
  const backdropBase = "https://image.tmdb.org/t/p/original";

  const poster = item.poster_path ? `${posterBase}${item.poster_path}` : "";
  const backdrop = item.backdrop_path
    ? `${backdropBase}${item.backdrop_path}`
    : "";

  return {
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

export async function fetchTrendingMedia(): Promise<MediaItem[]> {
  const data = await apiFetch<{ results: TMDBItem[] }>("/trending/all/day");
  return data.results.map(mapTMDBToMediaItem);
}
