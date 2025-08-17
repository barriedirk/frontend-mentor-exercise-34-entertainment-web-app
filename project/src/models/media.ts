export type MediaType = "trending" | "regular" | "poster";

export type CategoryType = "Movie" | "TV Series";

export type ParamType = [number, "movie" | "tv"];

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
    trending: MediaThumbnailTrending;
    regular: MediaThumbnailRegular;
  };
}

export interface MediaThumbnailTrending {
  small: string;
  large: string;
}

export interface MediaThumbnailRegular extends MediaThumbnailTrending {
  medium: string;
}

export interface MediaItem extends MediaInfo, MediaThumbnail {}
