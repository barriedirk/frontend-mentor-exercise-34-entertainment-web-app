export type MediaType = "trending" | "regular";

export type CategoryType = "Movie" | "TV Series";

export interface MediaInfo {
  id: number;
  title: string;
  year: number;
  category: CategoryType;
  rating: string;
  isBookmarked: boolean;
  isTrending: boolean;
}

export interface MediaThumbnail {
  thumbnail: {
    trending: { small: string; large: string };
    regular: { small: string; medium: string; large: string };
  };
}

export interface MediaItem extends MediaInfo, MediaThumbnail {}
