import type { MediaItem } from "@/models/media";
const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const cache = new Map<string, { data: any; expiresAt: number }>();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

import { loadAbort } from "@/utils/loadAbort";

import { type TMDBItem } from "@/models/TMDBItem";
import { mapTMDBToMediaItem } from "@/utils/mappers/mapTMDBToMediaItem";
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
    return cached.data;
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
    call: fetchData<{ results: TMDBItem[] }>(
      "3/trending/all/day",
      controller
    ).then((data) => data.results.map(mapTMDBToMediaItem)),
    controller,
  };
}

export interface FetchRecommendedMediaResponse {
  items: MediaItem[];
  hasMore: boolean;
  totalPages: number;
}

export function fetchRecommendedMedia(
  page = 1
): UseApiCall<FetchRecommendedMediaResponse> {
  const controller = loadAbort();

  const call = Promise.all([
    fetchData<{ results: TMDBItem[]; total_pages: number }>(
      `3/movie/popular?page=${page}`,
      controller
    ),
    fetchData<{ results: TMDBItem[]; total_pages: number }>(
      `3/tv/popular?page=${page}`,
      controller
    ),
  ]).then(([moviesData, tvData]) => {
    const items = [...moviesData.results, ...tvData.results]
      .map(mapTMDBToMediaItem)
      .sort((a, b) => a.title.localeCompare(b.title));

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
