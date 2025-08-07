import mediaData from "@/data/data.json";
import MovieSection from "@/components/movie/MovieSection";
import Search from "@/components/forms/search/Search";
import { useMediaSearch } from "@/hooks/useMediaSearch";
import type { MediaItem } from "@/types/media";

export default function TVSeries() {
  const allItems = mediaData as MediaItem[];
  const movieItems = allItems.filter((item) => item.category === "TV Series");

  const { searchTerm, debouncedSearchTerm, filteredItems } =
    useMediaSearch(movieItems);

  return (
    <section className="mt-[24px] mx-[16px]">
      <Search placeholder="Search for TV Series" searchTerm={searchTerm} />
      <MovieSection
        title={
          filteredItems.value.length === 0
            ? "No movies found"
            : `Found ${filteredItems.value.length} TV Series${
                filteredItems.value.length > 1 ? "s" : ""
              }`
        }
        items={filteredItems.value}
        sectionType="regular"
        ariaLabel="Movie list"
        showWhenEmpty
      />
    </section>
  );
}
