import { createSelector } from "reselect";

import type { RootState } from "@/state";
import type { MediaItem } from "@/models/media";

const selectBookmarkList = (state: RootState) => state.bookmarks.list;
const selectBookmarkData = (state: RootState) => state.bookmarks.data;

export const selectBookmarkedItems = createSelector(
  [selectBookmarkList, selectBookmarkData],
  (list, data): MediaItem[] => {
    return list.map((id) => data[id] ?? null).filter(Boolean) as MediaItem[];
  }
);
