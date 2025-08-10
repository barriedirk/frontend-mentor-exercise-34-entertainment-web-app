import { useEffect, useRef, useState } from "react";
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

  const topRef = useRef<HTMLDivElement | null>(null);

  const [shouldScroll, setShouldScroll] = useState(false);
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
    controller: recommendedController,
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
      if (recommendedController) recommendedController.abort();

      setSearchText(debouncedSearchTerm.value);
      setPage(1);
      recommendedFetch([1, debouncedSearchTerm.value]);
    }
  }, [
    debouncedSearchTerm.value,
    searchText,
    recommendedFetch,
    recommendedController,
  ]);

  useEffect(() => {
    if (shouldScroll && topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
      setShouldScroll(false);
    }
  }, [shouldScroll, filteredItems]);

  const recommendedTitle = (): string => {
    if (recommendedLoading) return "";

    if (filteredItems.length === 0) return "No movies or TV Series found";

    if (filteredItems.length > 0 && debouncedSearchTerm.value.length > 0)
      return `Found ${recommendedData?.totalPages} page${
        recommendedData?.totalPages || 1 > 1 ? "s" : ""
      } for '${debouncedSearchTerm.value}'`;

    return "Recommended for you";
  };

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
        ref={topRef}
        title={recommendedTitle()}
        items={filteredItems}
        sectionType="poster"
        ariaLabel="Movie or TV Series list"
        isPaginated
        currentPage={page}
        totalPages={recommendedData?.totalPages ?? 1}
        onPageChange={(newPage) => {
          setPage(newPage);
          recommendedFetch([newPage, debouncedSearchTerm.value]);
          setShouldScroll(true);
        }}
        loading={recommendedLoading}
        loadingMessage="Loading movies and TV Series recommended ..."
        error={!!recommendedError}
        errorMessage={`Movies and TV Series Error: ${recommendedError}`}
      />
    </section>
  );
}
