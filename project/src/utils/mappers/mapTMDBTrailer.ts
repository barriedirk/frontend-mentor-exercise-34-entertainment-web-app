import type { TMDBTrailer, TMDBTrailerItem } from "@/models/TMDBTrailer";

export function mapTMDBTrailer(data: TMDBTrailer): TMDBTrailer {
  return {
    id: data.id | 0,
    results: mapAllTMDBTrailers(data.results ?? []),
  };
}

export function mapAllTMDBTrailers(data: TMDBTrailerItem[]): TMDBTrailerItem[] {
  return data
    .filter(
      (item) =>
        item.site === "YouTube" &&
        item.type === "Trailer" &&
        item.key?.trim() !== ""
    )
    .map((item) => ({
      id: item.id,
      key: item.key,
      name: item.name,
      site: item.site,
      type: item.type,
    }));
}
