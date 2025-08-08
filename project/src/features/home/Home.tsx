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

  const {
    loading: recommendedLoading,
    error: recommendedError,
    data: recommendedData,
    fetch: recommendedFetch,
  } = useApi<FetchRecommendedMediaResponse, number>(fetchRecommendedMedia, {
    autoFetch: true,
    params: 1,
  });

  const { searchTerm, debouncedSearchTerm, filteredItems } = useMediaSearch(
    recommendedData?.items ?? []
  );

  return (
    <section className="mt-[24px] mx-[16px]">
      <Search
        placeholder="Search for movies or TV Series"
        searchTerm={searchTerm}
      />
      {trendingLoading && (
        <p className="text-white-custom text-preset-3">Loading trending ...</p>
      )}
      {!trendingLoading && !!trendingError && (
        <p className="text-red-500 text-preset-3">
          Loading Error Trending: {String(trendingError)}
        </p>
      )}
      {!trendingLoading &&
        !trendingError &&
        debouncedSearchTerm.value.length === 0 && (
          <MovieSection
            title="Trending"
            items={(trendingItems as MediaItem[]) || []}
            sectionType="trending"
            ariaLabel="Trending"
          />
        )}

      {recommendedLoading && (
        <p className="text-white-custom text-preset-3">
          Loading movies and TV Series recommended ...
        </p>
      )}
      {!recommendedLoading && !!recommendedError && (
        <p className="text-red-500 text-preset-3">
          Movies and TV Series Error: {String(recommendedError)}
        </p>
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
        onLoadMore={() => {
          setPage((page) => page + 1);
          recommendedFetch(page + 1);
        }}
        hasMore={recommendedData?.hasMore}
        loading={recommendedLoading}
      />
    </section>
  );
}
