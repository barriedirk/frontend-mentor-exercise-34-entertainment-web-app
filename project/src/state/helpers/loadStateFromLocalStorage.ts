import localforage from "@/lib/localforage";

import type { BookmarksState } from "@/models/bookmarksState";

import { BookmarksStateSchema } from "./schema";

// export function loadStateFromLocalStorage():
//   | { bookmarks: BookmarksState }
//   | undefined {
//   try {
//     const serializedState = localStorage.getItem("bookmarks");
//     if (!serializedState) return undefined;
//
//     const parsed = JSON.parse(serializedState);
//     const validated = BookmarksStateSchema.parse(parsed);
//
//     return { bookmarks: validated };
//   } catch (err) {
//     console.error("Invalid bookmarks state in localStorage", err);
//     return undefined;
//   }
// }

export async function loadBookmarksState(): Promise<
  { bookmarks: BookmarksState } | undefined
> {
  try {
    const data = await localforage.getItem("bookmarks");

    if (!data) return undefined;

    const validated = BookmarksStateSchema.parse(data);
    return { bookmarks: validated };
  } catch (err) {
    console.error("Failed to load bookmarks from localforage", err);
    return undefined;
  }
}
