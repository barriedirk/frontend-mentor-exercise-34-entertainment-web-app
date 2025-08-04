import { signal, computed, effect } from "@preact/signals-react";
import type { MediaItem } from "@/types/media";

export const searchHomeTerm = signal<string>("");

export const mediaItems = signal<MediaItem[]>([]);
export const instantSearchTerm = signal("");
export const debouncedSearchTerm = signal("");

let debounceTimer: ReturnType<typeof setTimeout>;
effect(() => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    debouncedSearchTerm.value = instantSearchTerm.value;
  }, 500);
});

export const filteredMedia = computed(() => {
  const term = debouncedSearchTerm.value.trim().toLowerCase();
  return mediaItems.value.filter((item) =>
    item.title.toLowerCase().includes(term)
  );
});
