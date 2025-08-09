import { useEffect, useState } from "react";
import { useSignals } from "@preact/signals-react/runtime";

import MovieSection from "@/components/movie/MovieSection";
import Search from "@/components/forms/search/Search";

import { useMediaSearch } from "@/hooks/useMediaSearch";

import type { MediaItem } from "@/models/media";

import {
  fetchRecommendedMedia,
  fetchTrendingMedia,
  type FetchRecommendedMediaResponse,
} from "@/api/tmdb";
import { useApi } from "@/hooks/useApi";

export default function Home() {
  useSignals();

  const [page, setPage] = useState(1);

  const {
    loading: trendingLoading,
    error: trendingError,
    data: trendingItems,
  } = useApi<MediaItem[], number>(fetchTrendingMedia, {
    autoFetch: true,
    params: 1,
  });

  const [searchText, setSearchText] = useState("");

  const {
    loading: recommendedLoading,
    error: recommendedError,
    data: recommendedData,
    fetch: recommendedFetch,
  } = useApi<FetchRecommendedMediaResponse, [number, string]>(
    fetchRecommendedMedia,
    {
      autoFetch: true,
      params: [1, searchText],
    }
  );

  const { searchTerm, debouncedSearchTerm, filteredItems } = useMediaSearch(
    recommendedData?.items ?? []
  );

  useEffect(() => {
    if (debouncedSearchTerm.value !== searchText) {
      setSearchText(debouncedSearchTerm.value);
      setPage(1);
      recommendedFetch([1, debouncedSearchTerm.value]);
    }
  }, [debouncedSearchTerm.value, searchText, recommendedFetch]);

  return (
    <section className="mt-[24px] mx-[16px]">
      <Search
        placeholder="Search for movies or TV Series"
        searchTerm={searchTerm}
      />
      {debouncedSearchTerm.value.length === 0 && (
        <MovieSection
          title="Trending"
          items={(trendingItems as MediaItem[]) || []}
          sectionType="trending"
          ariaLabel="Trending"
          loading={trendingLoading}
          loadingMessage="Loading trending ..."
          error={!!trendingError}
          errorMessage={`Loading Error Trending: ${trendingError}`}
        />
      )}

      <MovieSection
        title={
          debouncedSearchTerm.value.length === 0
            ? "Recommended for you"
            : filteredItems.value.length === 0
              ? "No movies or TV Series found"
              : `Found ${filteredItems.value.length} result${
                  filteredItems.value.length > 1 ? "s" : ""
                } for '${debouncedSearchTerm.value}'`
        }
        items={filteredItems.value}
        sectionType="regular"
        ariaLabel="Movie or TV Series list"
        isPaginated
        currentPage={page}
        totalPages={recommendedData?.totalPages ?? 1}
        onPageChange={(newPage) => {
          setPage(newPage);
          recommendedFetch([newPage, debouncedSearchTerm.value]);
        }}
        loading={recommendedLoading}
        loadingMessage="Loading movies and TV Series recommended ..."
        error={!!recommendedError}
        errorMessage={`Movies and TV Series Error: ${recommendedError}`}
      />
    </section>
  );
}
