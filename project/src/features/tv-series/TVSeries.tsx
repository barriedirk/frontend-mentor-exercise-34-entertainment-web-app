import { useState } from "react";

import { useSignals } from "@preact/signals-react/runtime";

import MovieSection from "@/components/movie/MovieSection";
import Search from "@/components/forms/search/Search";
import { useMediaSearch } from "@/hooks/useMediaSearch";

import {
  fetchTVSeriesMedia,
  type FetchRecommendedMediaResponse,
} from "@/api/tmdb";

import { useApi } from "@/hooks/useApi";

export default function Movies() {
  useSignals();

  const [page, setPage] = useState(1);
  const { loading, error, data, fetch } = useApi<
    FetchRecommendedMediaResponse,
    number
  >(fetchTVSeriesMedia, {
    autoFetch: true,
    params: 1,
  });

  const { searchTerm, debouncedSearchTerm, filteredItems } = useMediaSearch(
    data?.items ?? []
  );

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
        ariaLabel="TV Series list"
        isPaginated
        currentPage={page}
        totalPages={data?.totalPages ?? 1}
        onPageChange={(newPage) => {
          setPage(newPage);
          fetch(newPage);
        }}
        loading={loading}
        loadingMessage="Loading TV Series ..."
        error={!!error}
        errorMessage={`TV Series Error: ${error}`}
      />
    </section>
  );
}
