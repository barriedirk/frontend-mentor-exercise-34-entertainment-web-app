import type { MediaItem } from "@/models/media";

export interface BookmarksState {
  list: string[];
  data: {
    [id: string]: MediaItem;
  };
}
