export type MediaType = "trending" | "regular";

export interface MediaInfo {
  title: string;
  year: number;
  category: "Movie" | "TV Series";
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
