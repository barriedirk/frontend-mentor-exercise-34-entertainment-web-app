// hooks/useMediaSearch.ts

import { useSignal, useComputed } from "@preact/signals-react";
import { useDebouncedSignal } from "./useDebouncedSignal";
import type { MediaItem } from "@/types/media";

export function useMediaSearch(items: MediaItem[]) {
  const searchTerm = useSignal("");
  const debouncedSearchTerm = useDebouncedSignal(searchTerm, 500);

  const filteredItems = useComputed(() =>
    items.filter((item) =>
      item.title.toLowerCase().includes(debouncedSearchTerm.value.toLowerCase())
    )
  );

  return {
    searchTerm,
    debouncedSearchTerm,
    filteredItems,
  };
}
