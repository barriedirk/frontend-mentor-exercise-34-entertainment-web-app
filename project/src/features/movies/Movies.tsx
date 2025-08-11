import { useEffect, useRef, useState } from "react";

import { useSignals } from "@preact/signals-react/runtime";

import MovieSection from "@/components/movie/MovieSection";
import Search from "@/components/forms/search/Search";
import { useMediaSearch } from "@/hooks/useMediaSearch";

import {
  fetchMoviesMedia,
  type FetchRecommendedMediaResponse,
} from "@/api/tmdb";
import { useApi } from "@/hooks/useApi";

export default function Movies() {
  useSignals();

  const topRef = useRef<HTMLDivElement | null>(null);

  const [shouldScroll, setShouldScroll] = useState(false);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  const { loading, error, data, fetch, controller } = useApi<
    FetchRecommendedMediaResponse,
    [number, string]
  >(fetchMoviesMedia, {
    autoFetch: true,
    params: [1, searchText],
  });

  const { searchTerm, debouncedSearchTerm, filteredItems } = useMediaSearch(
    data?.items ?? []
  );

  useEffect(() => {
    if (debouncedSearchTerm.value !== searchText) {
      if (controller) controller.abort();

      setSearchText(debouncedSearchTerm.value);
      setPage(1);
      fetch([1, debouncedSearchTerm.value]);
    }
  }, [debouncedSearchTerm.value, searchText, fetch, controller]);

  useEffect(() => {
    if (shouldScroll && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [shouldScroll, filteredItems]);

  const title = (): string => {
    if (loading) return "";

    if (filteredItems.length === 0) return "No movies found";

    if (filteredItems.length > 0 && debouncedSearchTerm.value.length > 0)
      return `Found ${data?.totalPages} page${
        data?.totalPages || 1 > 1 ? "s" : ""
      } for '${debouncedSearchTerm.value}'`;

    return "Movies";
  };

  return (
    <section className="mt-[24px] mx-[16px]">
      <Search placeholder="Search for movies" searchTerm={searchTerm} />

      <MovieSection
        ref={topRef}
        title={title()}
        items={filteredItems}
        sectionType="poster"
        ariaLabel="Movie list"
        isPaginated
        currentPage={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={(newPage) => {
          setPage(newPage);
          fetch([newPage, debouncedSearchTerm.value]);
          setShouldScroll(true);
        }}
        loading={loading}
        loadingMessage="Loading movies ..."
        error={!!error}
        errorMessage={`Movies Error: ${error}`}
      />
    </section>
  );
}
