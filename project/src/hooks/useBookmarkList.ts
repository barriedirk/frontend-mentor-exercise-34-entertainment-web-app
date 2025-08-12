import type { MediaItem } from "@/models/media";
import { useTypedSelector } from "./useTypedSelector";

export function useBookmarkList() {
  return useTypedSelector<MediaItem[]>(({ bookmarks }) => {
    const { list, data } = bookmarks;

    return list.map((id) => data[id] ?? null).filter(Boolean);
  });
}
