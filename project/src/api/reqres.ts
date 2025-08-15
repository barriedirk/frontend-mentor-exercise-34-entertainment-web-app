import type { UseApiCall } from "@/models/useApiCall";
import { loadAbort } from "@/utils/loadAbort";

const BASE_URL = "https://reqres.in/";

export interface RegresResponse {
  id?: number;
  token?: string;
  error: string;
}

async function regresFetch<T>(
  endpoint: string,
  controller: AbortController,
  options: RequestInit = {}
): Promise<T> {
  const url = new URL(endpoint, BASE_URL).toString();

  const method = options.method || "GET";

  const res = await fetch(url, {
    ...options,
    signal: controller.signal,
    method,
    headers: {
      "x-api-key": "reqres-free-v1",
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

  return data;
}

export function login([email = "", password = ""]: [
  string,
  string,
]): UseApiCall<RegresResponse> {
  const controller = loadAbort();

  const call = regresFetch<RegresResponse>("api/login", controller, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return {
    call,
    controller,
  };
}

export function register([email = "", password = ""]: [
  string,
  string,
]): UseApiCall<RegresResponse> {
  const controller = loadAbort();

  const call = regresFetch<RegresResponse>("api/register", controller, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  return {
    call,
    controller,
  };
}
