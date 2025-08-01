const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// 🧠 In-memory cache: stores data and expiration time
const cache = new Map<string, { data: any; expiresAt: number }>();

// ⏱️ Cache duration (in milliseconds) — adjust as needed
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = new URL(endpoint, BASE_URL);
  url.searchParams.set("api_key", API_KEY);

  const cacheKey = url.toString();
  const now = Date.now();

  // ✅ Return cached value if it's still valid
  const cached = cache.get(cacheKey);
  if (cached && now < cached.expiresAt) {
    return cached.data;
  }

  // 🌐 Fetch from the API
  const res = await fetch(cacheKey, {
    ...options,
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

  // 💾 Store in cache with expiration
  cache.set(cacheKey, {
    data,
    expiresAt: now + CACHE_TTL,
  });

  return data;
}
