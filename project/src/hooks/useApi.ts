import { useCallback, useEffect, useState } from "react";

import type {
  CustomError,
  Data,
  UseApiCall,
  UseApiOptions,
  UseApiResult,
} from "@/models/useApiCall";

export const useApi = <T, P>(
  apiCall: (param: P) => UseApiCall<T>,
  options?: UseApiOptions<P>
): UseApiResult<T, P> => {
  const [autoFetched, setAutoFetched] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Data<T>>(null);
  const [error, setError] = useState<CustomError>(null);

  const fetch = useCallback(
    (param: P) => {
      const { call, controller } = apiCall(param);
      setLoading(true);

      call
        .then((response) => {
          setData(response);
          setError(null);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setLoading(false);
        });
      return () => controller.abort();
    },
    [apiCall]
  );

  useEffect(() => {
    if (options?.autoFetch && !autoFetched) {
      setAutoFetched(true);

      return fetch(options.params);
    }
  }, [fetch, options?.autoFetch, options?.params, autoFetched]);

  return { loading, data, error, fetch };
};
