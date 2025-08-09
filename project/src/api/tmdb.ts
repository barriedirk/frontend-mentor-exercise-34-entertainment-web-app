import type { MediaItem } from "@/models/media";
import { type CacheEntry } from "@/models/cacheEntry";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const cache = new Map<string, CacheEntry<unknown>>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

import { loadAbort } from "@/utils/loadAbort";

import { type TMDBTrendingItem } from "@/models/TMDBTrendingItem";
import { type TMDBTVSerieItem } from "@/models/TMDBTVSerieItem";
import { type TMDBMovieItem } from "@/models/TMDBMovieItem";

import { mapTrendingToMediaItem } from "@/utils/mappers/mapTrendingToMediaItem";
import { mapMovieToMediaItem } from "@/utils/mappers/mapMovieToMediaItem";
import { mapTVToMediaItem } from "@/utils/mappers/mapTVToMediaItem";

import type { UseApiCall } from "@/models/useApiCall";

async function fetchData<T>(
  endpoint: string,
  controller: AbortController,
  options: RequestInit = {}
): Promise<T> {
  const url = new URL(endpoint, BASE_URL);

  url.searchParams.set("api_key", API_KEY);

  const cacheKey = url.toString();
  const now = Date.now();
  const cached = cache.get(cacheKey);

  if (cached && now < cached.expiresAt) {
    return cached.data as T;
  }

  const method = options.method || "GET";

  const res = await fetch(cacheKey, {
    ...options,
    signal: controller.signal,
    method,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));

    throw new Error(
      `API error ${res.status}: ${error.status_message || res.statusText}`
    );
  }

  const data = await res.json();

  cache.set(cacheKey, {
    data,
    expiresAt: now + CACHE_TTL,
  });

  return data;
}

export function fetchTrendingMedia(): UseApiCall<MediaItem[]> {
  const controller = loadAbort();

  return {
    call: fetchData<{ results: TMDBTrendingItem[] }>(
      "3/trending/all/day",
      controller
    ).then((data) => data.results.map(mapTrendingToMediaItem)),
    controller,
  };
}

export interface FetchRecommendedMediaResponse {
  items: MediaItem[];
  hasMore: boolean;
  totalPages: number;
}

export function fetchRecommendedMedia([page = 1, searchText = ""]: [
  number,
  string,
]): UseApiCall<FetchRecommendedMediaResponse> {
  const controller = loadAbort();

  const endpointMovies = searchText
    ? `3/search/movie?query=${encodeURIComponent(searchText)}&page=${page}`
    : `3/movie/popular?page=${page}`;

  const endpointTV = searchText
    ? `3/search/tv?query=${encodeURIComponent(searchText)}&page=${page}`
    : `3/tv/popular?page=${page}`;

  const call = Promise.all([
    fetchData<{ results: TMDBMovieItem[]; total_pages: number }>(
      endpointMovies,
      controller
    ),
    fetchData<{ results: TMDBTVSerieItem[]; total_pages: number }>(
      endpointTV,
      controller
    ),
  ]).then(([moviesData, tvData]) => {
    const items = [
      ...moviesData.results.map(mapMovieToMediaItem),
      ...tvData.results.map(mapTVToMediaItem),
    ].sort((a, b) => a.title.localeCompare(b.title));

    const hasMore = page < Math.min(moviesData.total_pages, tvData.total_pages);

    return {
      items,
      hasMore,
      totalPages: Math.min(moviesData.total_pages, tvData.total_pages),
    };
  });

  return {
    call,
    controller,
  };
}

export function fetchMoviesMedia([page = 1, searchText = ""]: [
  number,
  string,
]): UseApiCall<FetchRecommendedMediaResponse> {
  const controller = loadAbort();

  const endpointMovies = searchText
    ? `3/search/movie?query=${encodeURIComponent(searchText)}&page=${page}`
    : `3/movie/popular?page=${page}`;

  const call = fetchData<{ results: TMDBMovieItem[]; total_pages: number }>(
    endpointMovies,
    controller
  ).then((moviesData) => {
    const items = moviesData.results
      .map(mapMovieToMediaItem)
      .sort((a, b) => a.title.localeCompare(b.title));

    const hasMore = page < moviesData.total_pages;

    return {
      items,
      hasMore,
      totalPages: moviesData.total_pages,
    };
  });

  return {
    call,
    controller,
  };
}

export function fetchTVSeriesMedia([page = 1, searchText = ""]: [
  number,
  string,
]): UseApiCall<FetchRecommendedMediaResponse> {
  const controller = loadAbort();

  const endpointTV = searchText
    ? `3/search/tv?query=${encodeURIComponent(searchText)}&page=${page}`
    : `3/tv/popular?page=${page}`;

  const call = fetchData<{ results: TMDBTVSerieItem[]; total_pages: number }>(
    endpointTV,
    controller
  ).then((tvData) => {
    const items = tvData.results
      .map(mapTVToMediaItem)
      .sort((a, b) => a.title.localeCompare(b.title));

    const hasMore = page < tvData.total_pages;

    return {
      items,
      hasMore,
      totalPages: tvData.total_pages,
    };
  });

  return {
    call,
    controller,
  };
}
