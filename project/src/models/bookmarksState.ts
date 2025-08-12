import type { MediaItem } from "@/models/media";

export interface BookmarksState {
  list: string[];
  data: BookmarksStateData;
}

export type BookmarksStateData = Record<string, MediaItem>;
