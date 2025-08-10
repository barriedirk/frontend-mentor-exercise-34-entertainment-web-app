export type Data<T> = T | null;
export type CustomError = Error | null;

export interface UseApiResult<T, P> {
  loading: boolean;
  data: Data<T>;
  error: CustomError;
  fetch: (param: P) => void;
  controller?: AbortController | null;
}

export type UseApiOptions<P> = {
  autoFetch?: boolean;
  params: P;
};

export interface UseApiCall<T> {
  call: Promise<T>;
  controller: AbortController;
}
