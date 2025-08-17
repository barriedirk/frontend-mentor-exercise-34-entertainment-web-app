import { useEffect, useRef, useState } from "react";

import { useSignals } from "@preact/signals-react/runtime";

import MovieSection from "@/components/movie/MovieSection";
import Search from "@/components/forms/search/Search";
import { useMediaSearch } from "@/hooks/useMediaSearch";

import { useBookmarkList } from "@/hooks/useBookmarkList";

export default function Bookmarks() {
  useSignals();

  const bookmarks = useBookmarkList();

  const topRef = useRef<HTMLDivElement | null>(null);

  const [shouldScroll, setShouldScroll] = useState(false);

  const { searchTerm, debouncedSearchTerm, filteredItems } = useMediaSearch(
    bookmarks ?? []
  );

  useEffect(() => {
    if (shouldScroll && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [shouldScroll, filteredItems]);

  const title = (): string => {
    const itemsLen = filteredItems.length;

    if (itemsLen === 0) return "No bookmarks found";

    if (itemsLen > 0 && debouncedSearchTerm.value.length > 0)
      return `Found ${itemsLen} bookmark${
        itemsLen || 1 > 1 ? "s" : ""
      } for '${debouncedSearchTerm.value}'`;

    return "Bookmarks";
  };

  return (
    <section className="mt-[24px] mx-[16px]">
      <Search placeholder="Search for bookmarks" searchTerm={searchTerm} />

      <MovieSection
        ref={topRef}
        title={title()}
        items={filteredItems}
        sectionType="poster"
        ariaLabel="Bookmark list"
      />
    </section>
  );
}
