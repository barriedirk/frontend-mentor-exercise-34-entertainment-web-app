import { useState } from "react";

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

  const [page, setPage] = useState(1);
  const { loading, error, data, fetch } = useApi<
    FetchRecommendedMediaResponse,
    number
  >(fetchMoviesMedia, {
    autoFetch: true,
    params: 1,
  });

  const { searchTerm, debouncedSearchTerm, filteredItems } = useMediaSearch(
    data?.items ?? []
  );

  return (
    <section className="mt-[24px] mx-[16px]">
      <Search placeholder="Search for movies" searchTerm={searchTerm} />

      <MovieSection
        title={
          debouncedSearchTerm.value.length === 0
            ? "Movies"
            : filteredItems.value.length === 0
              ? "No movies found"
              : `Found ${filteredItems.value.length} result${
                  filteredItems.value.length > 1 ? "s" : ""
                } for '${debouncedSearchTerm.value}'`
        }
        items={filteredItems.value}
        sectionType="regular"
        ariaLabel="Movie list"
        isPaginated
        currentPage={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={(newPage) => {
          setPage(newPage);
          fetch(newPage);
        }}
        loading={loading}
        loadingMessage="Loading movies ..."
        error={!!error}
        errorMessage={`Movies Error: ${error}`}
      />
    </section>
  );
}
