import { useSignals } from "@preact/signals-react/runtime";

import mediaData from "@/data/data.json";
import MovieSection from "@/components/movie/MovieSection";
import Search from "@/components/forms/search/Search";
import { useMediaSearch } from "@/hooks/useMediaSearch";
import type { MediaItem } from "@/models/media";

export default function Movies() {
  useSignals();

  const allItems = mediaData as MediaItem[];
  const movieItems = allItems.filter((item) => item.category === "TV Series");

  const { searchTerm, debouncedSearchTerm, filteredItems } =
    useMediaSearch(movieItems);

  return (
    <section className="mt-[24px] mx-[16px]">
      <Search placeholder="Search for TV Series" searchTerm={searchTerm} />
      <MovieSection
        title={
          debouncedSearchTerm.value.length === 0
            ? "TV Series"
            : filteredItems.value.length === 0
              ? "No TV Series found"
              : `Found ${filteredItems.value.length} result${
                  filteredItems.value.length > 1 ? "s" : ""
                } for '${debouncedSearchTerm.value}'`
        }
        items={filteredItems.value}
        sectionType="regular"
        ariaLabel="Movie list"
      />
    </section>
  );
}
